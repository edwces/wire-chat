import { WebSocket } from "ws";
import { WebSocketMessage } from "../types/interfaces/websocket-message";

export function wsHandle(connection: WebSocket) {
  connection.send(JSON.stringify({ type: "ping" }));
  connection.on("message", (data) => {
    // parse data
    const message: WebSocketMessage = JSON.parse(data.toString("utf8"));

    // handle different types
    if (message.type === "TEXT_MESSAGE") {
      // update db and invalidate queries on all client
      // invalidate data on client
      connection.send(
        JSON.stringify({
          type: "INVALIDATE_DATA",
          body: { entity: ["conversation", "messages"] },
        })
      );
    }
  });
}
