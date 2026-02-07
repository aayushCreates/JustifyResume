
import { PrismaClient, ReportStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class ReportService {
  static async getLatestReportByResumeId(resumeId: string) {
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) {
      throw new Error("RESUME_NOT_FOUND");
    }

    const report = await prisma.report.findFirst({
      where: { resumeId },
      orderBy: { createdAt: "desc" },
      include: {
        skills: true,
        redFlags: true,
      },
    });

    if (!report) {
      throw new Error("REPORT_NOT_FOUND");
    }

    return report;
  }
}
