import { Redis } from "ioredis";

export const redisConnection = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("✅ Redis connected");
});

redisConnection.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});

redisConnection.on("close", () => {
  console.log("🔌 Redis connection closed");
});

redisConnection.on("reconnecting", () => {
  console.log("🔄 Redis reconnecting...");
});
