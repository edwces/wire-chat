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

export async function bootstrap() {
  const app = express();
  const orm = await MikroORM.init(mikroOrmConfig);

  app.use(cors({ origin: "*" }));
  app.use(bodyParser.json());
  app.use((request, _, next) => {
    RequestContext.create(orm.em, () => {
      request.em = orm.em as EntityManager;
      next();
    });
  });

  app.use("/user", userRouter);
  app.use("/conversation", conversationRouter);
  app.use("/auth", authRouter);

  const server = http.createServer(app);
  const wss = new webSocket.Server({ server });

  wss.on("connection", wsHandle(orm));

  server.listen(3001, () => {
    console.log("Server started at http://localhost:3001");
  });
}

bootstrap();
