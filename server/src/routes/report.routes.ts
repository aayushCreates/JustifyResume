import { FastifyInstance } from "fastify";
import { isUserLoggedIn } from "../middlewares/auth.middleware";
import getReport, { GetReportParams } from "../controllers/report.controller";

export default function reportRouter(
  fastify: FastifyInstance,
) {
  fastify.get<{ Params: GetReportParams }>(
    "/resume/:resumeId",
    {
      preHandler: isUserLoggedIn,
    },
    getReport
  );
}
