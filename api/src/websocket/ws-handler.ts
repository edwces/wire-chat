import { MikroORM } from "@mikro-orm/core";
import { WebSocket } from "ws";
import { Message } from "../db/entities/message.entity";
import { WebSocketMessage } from "../types/interfaces/websocket-message";
import { v4 } from "uuid";

const rooms: { [key: string]: { [key: string]: WebSocket } } = {};

export const wsHandle = (orm: MikroORM) => (connection: WebSocket) => {
  const sockUuid = v4();

  const leave = (roomId: string) => {
    if (roomId in rooms) {
      if (Object.keys(rooms[roomId]).length === 1) delete rooms[roomId];
      else delete rooms[roomId][sockUuid];
    }
  };

  const broadcast = (roomId: string, event: string) => {
    Object.values(rooms[roomId]).forEach((socket) => socket.send(event));
  };
  connection.on("message", async (raw) => {
    // create new em context
    const em = orm.em.fork();

    // parse data

    const event: WebSocketMessage = JSON.parse(raw.toString("utf8"));

    // handle different types
    if (event.type === "TEXT_MESSAGE") {
      // update db and invalidate queries on all client
      const { conversation, content, sender } = event.data;
      const message = em.create(Message, {
        conversation,
        participant: sender,
        content,
      });
      await em.persistAndFlush(message);

      // invalidate data on client
      broadcast(
        conversation,
        JSON.stringify({
          type: "INVALIDATE_DATA",
          data: { entity: ["conversation", "messages"] },
        })
      );
    } else if (event.type === "JOIN_ROOM") {
      const roomId = event.data.id as string;

      if (!(roomId in rooms)) {
        rooms[roomId] = {};
      }
      if (!(sockUuid in rooms[roomId])) rooms[roomId][sockUuid] = connection;
    } else if (event.type === "LEAVE_ROOM") {
      const roomId = event.data.id as string;
      leave(roomId);
    }
  });

  connection.on("close", (event) => {
    Object.keys(rooms).forEach((roomId) => leave(roomId));
  });
};
