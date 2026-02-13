import { Worker } from "bullmq";
import { PrismaClient } from "@prisma/client";
import {
  analyzeGithub,
  deepAnalysisGitRepo,
  verifyResume,
} from "../services/analysis.service";
import { ParsedResume } from "../types/resume.types";
import { redisConnection } from "../config/redis.config";

const prisma = new PrismaClient();

export const reportWorker = new Worker("report-analysis", async (job) => {
  const { reportId, resumeId } = job.data;

  try {
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) throw new Error("Resume not found");

    const parsedJson = resume.parsedJson as unknown as ParsedResume;
    const githubUrl = parsedJson?.links?.github as string;
    const gitUserName = githubUrl.replace(/\/$/, "").split("/").pop()!;

    const githubRepos = await analyzeGithub(
      resume.parsedJson as ParsedResume,
      gitUserName
    );

    const analysedRepos = await Promise.all(
      githubRepos.map((repo) => deepAnalysisGitRepo(repo, gitUserName))
    );

    const verifiedClaims = await verifyResume(
      analysedRepos,
      resume.parsedJson as ParsedResume
    );

    await prisma.$transaction(async (tx) => {
      await tx.report.update({
        where: { id: reportId },
        data: {
          status: "COMPLETED",
          credibility: verifiedClaims.credibilityScore,
          riskScore: 100 - verifiedClaims.credibilityScore,
          analysisMeta: {
            github: {
              username: gitUserName,
              reposAnalyzed: analysedRepos.length,
              repos: analysedRepos,
            },
          },
        },
      });

      await tx.skillScore.createMany({
        data: verifiedClaims.skills.map((s) => ({
          reportId: reportId,
          skill: s.skill,
          score: s.avgCommits,
          verdict: s.verdict,
          evidence: {
            repos: s.supportedRepos,
            avgOwnership: s.avgOwnership,
            avgCommits: s.avgCommits,
          },
        })),
      });

      await tx.redFlag.createMany({
        data: verifiedClaims.redFlags.map((msg) => ({
          reportId: reportId,
          message: msg,
          severity: "HIGH",
        })),
      });
    });
  } catch (err) {
    console.error("Worker failed:", err);

    await prisma.report.update({
        where: { id: reportId },
        data: {
          status: "FAILED",
          analysisMeta: {
            error: err instanceof Error ? err.message : "Unknown error",
          },
        },
      });
      

    throw err;
  }
}, {
    connection: redisConnection,
    concurrency: 3
});
