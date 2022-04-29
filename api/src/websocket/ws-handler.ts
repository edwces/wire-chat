import { WebSocket } from "ws";

export function wsHandle(connection: WebSocket) {
  connection.send("ping");
}
