import { ReactNode, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useConnection } from "../../stores/useConnection";

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const connect = useConnection((state) => state.connect);
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.addEventListener("open", (ev) => {
      connect(socket);
      socket.send(JSON.stringify({ type: "pong" }));
    });

    socket.addEventListener("message", (ev) => {
      const parsed = JSON.parse(ev.data);

      if (parsed.type == "INVALIDATE_DATA") {
        queryClient.invalidateQueries(parsed.body.entity);
      }
    });
  }, []);

  return <>{children}</>;
}
