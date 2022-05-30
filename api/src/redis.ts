import Redis from "ioredis";
import { environment } from "./config";

const redis = new Redis({
  host: environment.redis.host,
  password: environment.redis.password,
  port: environment.redis.port,
});

export default redis;
