import { FastifyInstance } from "fastify";
import {
  redirectGoogleAuth,
  callbackGoogleAuth,
  logout,
  getMe,
} from "../controllers/auth.controller";
import { isUserLoggedIn } from "../middlewares/auth.middleware";

export default function authRouter(
  fastify: FastifyInstance,
) {
  fastify.get("/google", redirectGoogleAuth);
  fastify.get("/google/callback", callbackGoogleAuth);
  fastify.post("/logout", logout);
  fastify.get("/me", { preHandler: [isUserLoggedIn] }, getMe);
}
