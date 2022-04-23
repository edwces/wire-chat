import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(__dirname, "../", "../", ".env.local") });

const { PORT, DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } =
  process.env;

export default {
  port: Number.parseInt(PORT!),
  db: {
    host: DB_HOST,
    port: Number.parseInt(DB_PORT!),
    name: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
  },
};
