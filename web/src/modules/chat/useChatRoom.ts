import { useEffect } from "react";
import { useConnection } from "../../stores/useConnection";

export function useChatRoom(id: number) {
  const connection = useConnection((state) => state.connection);
  useEffect(() => {
    connection?.send(JSON.stringify({ type: "JOIN_ROOM", data: { id } }));

    return () => {
      connection?.send(JSON.stringify({ type: "LEAVE_ROOM", data: { id } }));
    };
  }, [id, connection]);

  return connection;
}
