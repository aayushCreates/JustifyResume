import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { analyzeGithub, deepAnalysisGitRepo } from "../services/analysis.service";
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
        };;

        const githubRepos = await analyzeGithub(resume.parsedJson as ParsedResume, gitUserName);

        const deepedAnalysedRepos = await Promise.all(
            githubRepos.map((repo) =>
              deepAnalysisGitRepo(repo, gitUserName)
            )
          );

          return reply.status(200).send({
            success: true,
            message: "Github repos deeped analysis happend successfully",
            data: deepedAnalysedRepos,
          });
    }catch (err){
        console.log("Error in resume analysis: ", err);
    
        return reply.code(500).send({
          success: false,
          message: "Server error in resume analysis",
        });
    }
}

export async function verifyResumeClaims(
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
            };;
    
            const githubRepos = await analyzeGithub(resume.parsedJson as ParsedResume, gitUserName);
    
            const deepedAnalysedRepos = await Promise.all(
                githubRepos.map((repo) =>
                  deepAnalysisGitRepo(repo, gitUserName)
                )
              );
    
              return reply.status(200).send({
                success: true,
                message: "Github repos deeped analysis happend successfully",
                data: deepedAnalysedRepos,
              });
        }catch (err){
            console.log("Error in resume analysis: ", err);
        
            return reply.code(500).send({
              success: false,
              message: "Server error in resume analysis",
            });
        }
}