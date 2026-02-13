import { FastifyInstance } from "fastify";
import { isUserLoggedIn } from "../middlewares/auth.middleware";
import { analysisResumeController, AnalyzeResumeBody } from "../controllers/analysis.controller";


export default function analysisRouter(
  fastify: FastifyInstance,
) {
  fastify.post<{ Body: AnalyzeResumeBody }>(
    "/resume",
    {
      preHandler: isUserLoggedIn,
    },
    analysisResumeController
  );
}