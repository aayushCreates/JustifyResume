import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { analyzeGithub, deepAnalysisGitRepo, verifyResume } from "../services/analysis.service";
import { ParsedResume } from "../types/resume.types";

const prisma = new PrismaClient();


export async function analysisResume(
    req: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { resumeId } = req.body as { resumeId: string };

        const resume = await prisma.resume.findUnique({
            where: {
                id: resumeId
            }
        });
        if(!resume) {
            return reply.code(404).send({
                success: false,
                message: "Resume not found",
              });
        }

        const githubUrl = resume.parsedJson?.links?.github as string;
        if (!githubUrl) {
            return reply.status(404).send({
                success: false,
                message: "Github url is not found"
            });
        };

        const gitUserName = githubUrl
        .replace(/\/$/, "")
        .split("/")
        .pop();
        if (!gitUserName) {
            return reply.status(404).send({
                success: false,
                message: "Github username is not found"
            });
        };

        const report = await prisma.report.create({
            data: {
              userId: resume.userId,
              resumeId,
              githubUsername: gitUserName,
              status: "PROCESSING",
            },
          });

        const githubRepos = await analyzeGithub(resume.parsedJson as ParsedResume, gitUserName);

        const analysedRepos = await Promise.all(
            githubRepos.map((repo) =>
              deepAnalysisGitRepo(repo, gitUserName)
            )
          );

        const verifiedClaims = await verifyResume(analysedRepos, resume.parsedJson as ParsedResume);

        await prisma.$transaction(async (tx) => {
            await tx.report.update({
              where: { id: report.id },
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
              data: verifiedClaims.skills.map(s => ({
                reportId: report.id,
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
              data: verifiedClaims.redFlags.map(msg => ({
                reportId: report.id,
                message: msg,
                severity: "HIGH",
              })),
            });
          });

          return reply.status(200).send({
            success: true,
            message: "resume analysed successfully",
            reportId: report.id,
          });
    }catch (err){
        console.log("Error in resume analysis: ", err);
    
        return reply.code(500).send({
          success: false,
          message: "Server error in resume analysis",
        });
    }
}
