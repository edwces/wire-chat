import { WebSocket } from "ws";

export function wsHandle(connection: WebSocket) {
  connection.on("message", (data) => {
    console.log(`received ${data}`);
  });

  connection.send("Connected to socket succesfuly");
}
