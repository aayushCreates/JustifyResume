import { FastifyInstance } from "fastify";
import { redirectGoogleAuth, callbackGoogleAuth, logout } from "../controllers/auth.controller";


export default function authRouter(fastify: FastifyInstance) {
    fastify.get('/auth/google', redirectGoogleAuth);
    fastify.get('/auth/google/callback', callbackGoogleAuth);
    fastify.post('/logout', logout);
}

