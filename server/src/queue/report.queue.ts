import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.config";

export const reportQueue = new Queue("report-analysis", {
  connection: redisConnection,
});