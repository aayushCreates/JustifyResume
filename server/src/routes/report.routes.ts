import { FastifyInstance } from "fastify";
import { isUserLoggedIn } from "../middlewares/auth.middleware";
import getReport from "../controllers/report.controller";

export default function reportRouter(fastify: FastifyInstance) {
    fastify.get('/:id', {
        preHandler: isUserLoggedIn
    }, getReport)
}

