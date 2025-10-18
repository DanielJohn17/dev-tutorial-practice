import { createClient } from "redis";

const redis = createClient();

redis.on("error", (err) => console.log("Redis Client Error", err));

const startRedis = async () => {
  await redis.connect();
};

startRedis().catch((err) => console.error("Failed to connect to Redis", err));
export default redis;
