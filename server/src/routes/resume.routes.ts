import { FastifyInstance } from "fastify";
import { uploadResume } from "../controllers/resume.controller";


export default function resumeRoute(fastify: FastifyInstance) {
    fastify.post('/upload-resume', uploadResume);
}


