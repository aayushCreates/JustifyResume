import fastify from "fastify";
import dotenv from "dotenv";
import multipart from "@fastify/multipart";
import cookie from "@fastify/cookie";
import authRouter from "./routes/auth.routes";
import fastifyCors from "@fastify/cors";
import reportRouter from "./routes/report.routes";
import resumeRouter from "./routes/resume.routes";
import analysisRouter from "./routes/analysis.routes";
import { reportWorker } from "./workers/report.worker";

dotenv.config();

const app = fastify({
  logger: true,
});

app.register(cookie);

app.register(fastifyCors, {
  origin: process.env.FRONTEND_URL as string,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
});

app.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.register(authRouter, {
  prefix: "/api/v1/auth",
});
app.register(reportRouter, {
  prefix: "/api/v1/report",
});
app.register(resumeRouter, {
  prefix: "/api/v1/resume",
});
app.register(analysisRouter, {
  prefix: "/api/v1/analysis",
});


const port = Number(process.env.PORT);
app.listen({ port }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running at ${address}`);
});
