import { MikroORM, RequestContext } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import express from "express";
import { mikroOrmConfig } from "./config";
import cors from "cors";
import { userRouter } from "./modules/user";
import { conversationRouter } from "./modules/conversation";
import webSocket from "ws";
import http from "node:http";
import { wsHandle } from "./websocket";
import { authRouter } from "./modules/auth";
import bodyParser from "body-parser";
import path from "node:path";
import redis from "./redis";

export async function bootstrap() {
  const app = express();
  const orm = await MikroORM.init(mikroOrmConfig);

  app.use(cors({ origin: "*" }));
  app.use(express.static(path.resolve(__dirname, "../public")));
  app.use(bodyParser.json());
  app.use((request, _, next) => {
    RequestContext.create(orm.em, () => {
      request.em = orm.em.fork() as EntityManager;
      next();
    });
  });

  app.use("/user", userRouter);
  app.use("/conversation", conversationRouter);
  app.use("/auth", authRouter);

  const server = http.createServer(app);
  const wss = new webSocket.Server({ noServer: true });

  wss.on("connection", wsHandle(orm));
  server.on("upgrade", (request, socket, head) => {
    const url = new URL(request.url!, `http://${request.headers.host}`);
    const ticket = url.searchParams.get("ticket");
    if (!ticket) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }
    const userId = redis.get(ticket!);
    if (!userId) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  server.listen(3001, () => {
    console.log("Server started at http://localhost:3001");
  });
}

bootstrap();
