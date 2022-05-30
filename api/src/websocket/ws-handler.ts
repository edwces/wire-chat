import { MikroORM } from "@mikro-orm/core";
import { WebSocket } from "ws";
import { Message } from "../db/entities/message.entity";
import { WebSocketMessage } from "../types/interfaces/websocket-message";
import { v4 } from "uuid";
import redis from "../redis";
import { IncomingMessage } from "node:http";
import { User } from "../db/entities/user.entity";

type Room = Set<string>;

class WebSocketHandler {
  rooms: Map<number, Room>;
  connections: Map<string, WebSocket>;

  constructor() {
    this.rooms = new Map();
    this.connections = new Map();
  }

  broadcast(id: number, data: any) {
    for (const socketId of this.rooms.get(id)!) {
      this.connections.get(socketId)?.send(JSON.stringify(data));
    }
  }

  leave(id: number, socketId: string) {
    if (!this.rooms.get(id)) return null;
    if (this.rooms.get(id)?.size === 1) this.rooms.delete(id);

    this.rooms.get(id)?.delete(socketId);
  }

  join(id: number, socketId: string, connection: WebSocket) {
    if (!(id in this.rooms)) {
      this.rooms.set(id, new Set());
    }
    if (socketId in this.rooms.get(id)!) return true;

    this.rooms.get(id)?.add(socketId);

    if (socketId in this.connections) return true;

    this.connections.set(socketId, connection);
  }

  close(socketId: string) {
    for (const [id, _] of this.rooms) {
      this.leave(id, socketId);
    }
    this.connections.delete(socketId);
  }
}

const webSocketHandler = new WebSocketHandler();
export const wsHandle =
  (orm: MikroORM) =>
  (connection: WebSocket, request: IncomingMessage, user: { id: number }) => {
    const sockUuid = v4();
    let isAlive = true;
    connection.on("pong", () => {
      isAlive = true;
    });

    const heartbeat = () => {
      if (!isAlive) connection.terminate();
      connection.ping();
      isAlive = false;
    };
    const heartbeatId = setInterval(heartbeat, 20_000);

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
        webSocketHandler.broadcast(Number.parseInt(conversation), {
          type: "INVALIDATE_DATA",
          data: { entity: ["conversation", "messages"] },
        });
      } else if (event.type === "JOIN_ROOM") {
        const roomId = Number.parseInt(event.data.id);
        const currentUser = await em.findOne(User, { id: user.id });
        const conversations = await currentUser?.conversations.init({
          where: { id: roomId },
        });
        if (conversations?.count()) return;

        webSocketHandler.join(roomId, sockUuid, connection);
      } else if (event.type === "LEAVE_ROOM") {
        const roomId = Number.parseInt(event.data.id);
        webSocketHandler.leave(roomId, sockUuid);
      }
    });

    connection.on("close", (event) => {
      webSocketHandler.close(sockUuid);
      clearInterval(heartbeatId);
    });
  };
