import { MikroORM, RequestContext } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import express from "express";
import { mikroOrmConfig } from "./config";
import cors from "cors";
import { userRoutes } from "./modules/user";
import { conversationRouter } from "./modules/conversation";

export async function bootstrap() {
  const app = express();
  const orm = await MikroORM.init(mikroOrmConfig);

  app.use(cors({ origin: "*" }));

  app.use((request, response, next) => {
    RequestContext.create(orm.em, () => {
      request.em = orm.em as EntityManager;
      next();
    });
  });

  app.use("/user", userRoutes);
  app.use("/conversation", conversationRouter);

  app.listen(3001, () => {
    console.log("Listening on http://localhost:3000");
  });
}

bootstrap();
