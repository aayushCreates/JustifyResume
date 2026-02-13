import { FastifyInstance } from "fastify";
import { analyzeResume, uploadResume } from "../controllers/resume.controller";
import { isUserLoggedIn } from "../middlewares/auth.middleware";


export default function resumeRouter(
  fastify: FastifyInstance,
) {
  fastify.post(
    "/upload-resume",
    {
      preHandler: isUserLoggedIn,
    },
    uploadResume
  );

  fastify.post(
    "/",
    {
      preHandler: isUserLoggedIn,
    },
    analyzeResume
  );
}


