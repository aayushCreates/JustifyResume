import { FastifyInstance } from "fastify";
import { isUserLoggedIn } from "../middlewares/auth.middleware";
import { analysisResume } from "../controllers/analysis.controller";


export default function analysisRoute(fastify: FastifyInstance) {
    fastify.get('/resume', {
        preHandler: isUserLoggedIn
    }, analysisResume);
}