import { ReactNode, useEffect } from "react";
import { useConnection } from "../../stores/useConnection";

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const connect = useConnection((state) => state.connect);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.addEventListener("open", (ev) => {
      connect(socket);
      socket.send("pong");
    });
  }, []);

  return <>{children}</>;
}
