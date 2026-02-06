import fastify from "fastify";
import dotenv from "dotenv";
import multipart from "@fastify/multipart";
import cookie from "@fastify/cookie";
import authRouter from "./routes/auth.routes";

const app = fastify({
  logger: true,
});

dotenv.config();

app.register(cookie);

app.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024,
  }
});

app.register(authRouter, {
  prefix: "/api/v1/auth",
});

const port = Number(process.env.PORT);
app.listen({ port }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running at ${address}`);
});
