import { FastifyReply, FastifyRequest } from "fastify";
import { ReportService } from "../services/report.service";
import { ReportStatus } from "@prisma/client";

interface GetReportParams {
  resumeId: string;
}

export default async function getReportController(
  req: FastifyRequest<{ Params: GetReportParams }>,
  reply: FastifyReply
) {
  try {
    const { resumeId } = req.params;

    const report = await ReportService.getLatestReportByResumeId(resumeId);

    if (report.status === ReportStatus.PROCESSING) {
      return reply.status(202).send({
        success: true,
        status: "PROCESSING",
        reportId: report.id,
      });
    }

    if (report.status === ReportStatus.FAILED) {
      return reply.status(500).send({
        success: false,
        status: "FAILED",
        message: "Report generation failed",
      });
    }

    return reply.status(200).send({
      success: true,
      status: "COMPLETED",
      data: {
        reportId: report.id,
        credibility: report.credibility,
        riskScore: report.riskScore,
        analysisMeta: report.analysisMeta,
        skills: report.skills,
        redFlags: report.redFlags,
        createdAt: report.createdAt,
      },
    });

  } catch (error: any) {
    console.error("Error in fetching report:", error);

    switch (error.message) {
      case "RESUME_NOT_FOUND":
        return reply.status(404).send({
          success: false,
          message: "Resume is not found",
        });

      case "REPORT_NOT_FOUND":
        return reply.status(404).send({
          success: false,
          message: "No report found for this resume",
        });

      default:
        return reply.status(500).send({
          success: false,
          message: "Server error in fetching report",
        });
    }
  }
}
