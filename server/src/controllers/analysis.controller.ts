import { FastifyReply, FastifyRequest } from "fastify";
import { AnalysisService } from "../services/analysis.service";

export interface AnalyzeResumeBody {
  resumeId: string;
}

export async function analysisResumeController(
  req: FastifyRequest<{ Body: AnalyzeResumeBody }>,
  reply: FastifyReply
) {
  try {
    const { resumeId } = req.body;

    const result = await AnalysisService.analyzeResume(resumeId);

    return reply.status(202).send({
      success: true,
      reportId: result.reportId,
      status: result.status,
    });

  } catch (error: any) {
    console.error("Resume analysis error:", error);

    switch (error.message) {
      case "RESUME_NOT_FOUND":
        return reply.status(404).send({
          success: false,
          message: "Resume not found",
        });

      case "GITHUB_URL_NOT_FOUND":
        return reply.status(404).send({
          success: false,
          message: "GitHub URL not found in resume",
        });

      case "GITHUB_USERNAME_NOT_FOUND":
        return reply.status(404).send({
          success: false,
          message: "GitHub username could not be extracted",
        });

      default:
        return reply.status(500).send({
          success: false,
          message: "Server error in resume analysis",
        });
    }
  }
}
