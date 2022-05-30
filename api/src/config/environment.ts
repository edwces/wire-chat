import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(__dirname, "../", "../", ".env.local") });

const {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  JWT_SECRET_ACCESS,
  JWT_SECRET_REFRESH,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
} = process.env;

export default {
  port: Number.parseInt(PORT!),
  db: {
    host: DB_HOST,
    port: Number.parseInt(DB_PORT!),
    name: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
  },
  jwt: {
    refreshSecret: JWT_SECRET_ACCESS!,
    accessSecret: JWT_SECRET_REFRESH!,
  },
  redis: {
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
    port: Number.parseInt(REDIS_PORT!),
  },
};
