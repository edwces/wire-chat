import { ReactNode, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import { getAccessToken } from "../../services";
import { getTicket } from "../../services/authService";
import { useAuthStatus } from "../../stores/useAuthStatus";
import { useConnection } from "../../stores/useConnection";

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const connect = useConnection((state) => state.connect);
  const queryClient = useQueryClient();
  const [ticket, setTicket] = useState("");
  const status = useAuthStatus((state) => state.status);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    getTicket(token!).then((data) => {
      setTicket(data.ticket);
    });
  }, [status]);

  useEffect(() => {
    if (!ticket) return;

    const socket = new WebSocket(
      `${process.env.NEXT_API_URL}/?ticket=${ticket}`
    );

    socket.addEventListener("open", (_) => {
      connect(socket);
    });

    socket.addEventListener("message", (ev) => {
      const parsed = JSON.parse(ev.data);
      if (parsed.type == "INVALIDATE_DATA") {
        queryClient.invalidateQueries(parsed.data.entity);
      }
    });

    return () => socket.close();
  }, [ticket]);

  return <>{children}</>;
}
