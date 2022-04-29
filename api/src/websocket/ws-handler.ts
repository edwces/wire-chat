import { WebSocket } from "ws";

export function wsHandle(connection: WebSocket) {
  connection.send("ping");
  connection.on("message", (data) => {
    console.log("received", data.toString("utf8"));
  });
}
