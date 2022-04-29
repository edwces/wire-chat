import { ReactNode, useEffect } from "react";

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.addEventListener("open", (ev) => {
      socket.send("pong");
    });
  }, []);

  return <>{children}</>;
}
