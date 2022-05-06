import { MikroORM } from "@mikro-orm/core";
import { WebSocket } from "ws";
import { Message } from "../db/entities/message.entity";
import { WebSocketMessage } from "../types/interfaces/websocket-message";

export const wsHandle = (orm: MikroORM) => (connection: WebSocket) => {
  connection.on("message", async (raw) => {
    // create new em context
    const em = orm.em.fork();

    // parse data

    const event: WebSocketMessage = JSON.parse(raw.toString("utf8"));

    // handle different types
    if (event.type === "TEXT_MESSAGE") {
      // update db and invalidate queries on all client
      const message = em.create(Message, {
        conversation: 1,
        participant: 1,
        content: event.data,
      });
      await em.persistAndFlush(message);

      // invalidate data on client
      connection.send(
        JSON.stringify({
          type: "INVALIDATE_DATA",
          data: { entity: ["conversation", "messages"] },
        })
      );
    }
  });
};
