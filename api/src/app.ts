import { MikroORM, RequestContext } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import express from "express";
import { mikroOrmConfig } from "./config";
import cors from "cors";
import { userRoutes } from "./modules/user";
import { conversationRouter } from "./modules/conversation";
import webSocket from "ws";
import http from "node:http";
import { wsHandle } from "./websocket";

export async function bootstrap() {
  const app = express();
  const orm = await MikroORM.init(mikroOrmConfig);

  app.use(cors({ origin: "*" }));
  app.use((request, _, next) => {
    RequestContext.create(orm.em, () => {
      request.em = orm.em as EntityManager;
      next();
    });
  });

  app.use("/user", userRoutes);
  app.use("/conversation", conversationRouter);

  const server = http.createServer(app);
  const wss = new webSocket.Server({ server });

  wss.on("connection", wsHandle);

  server.listen(3001, () => {
    console.log("Server started at http://localhost:3001");
  });
}

bootstrap();
