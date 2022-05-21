import { ReactNode } from "react";
import { useQueryClient } from "react-query";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import { useConnection } from "../../stores/useConnection";

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const connect = useConnection((state) => state.connect);
  const queryClient = useQueryClient();

  useEffectOnce(() => {
    const socket = new WebSocket("ws://localhost:3001");

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
  }, []);

  return <>{children}</>;
}
