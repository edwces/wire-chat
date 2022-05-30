import environment from "./environment";
import { Options } from "@mikro-orm/core";

export default {
  type: "postgresql",
  host: environment.db.host,
  port: environment.db.port,
  user: environment.db.username,
  password: environment.db.password,
  dbName: environment.db.name,
  debug: true,
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  migrations: {
    path: "dist/db/migrations",
    pathTs: "src/db/migrations",
  },
  seeder: {
    pathTs: "src/db/seeder",
    path: "dist/db/seeder",
  },
} as Options;
