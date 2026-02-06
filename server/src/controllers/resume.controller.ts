import { FastifyReply, FastifyRequest } from "fastify";
import uploadPdfToCloudinary from "../utils/uploadCloudinary.utils";
import { parseResumeService } from "../services/resume.service";

export async function uploadResume(req: FastifyRequest, reply: FastifyReply) {
  try {
    const data = await req.file();

    if (!data) {
      return reply.code(400).send({ message: "No file uploaded" });
    }

    if (data.mimetype !== "application/pdf") {
      return reply.code(400).send({ message: "Only PDF files allowed" });
    }

    const result: any = await uploadPdfToCloudinary(data.file);

    reply.status(200).send({
      message: "PDF uploaded successfully",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.log("Error in upload resume controller ERROR: ", err);

    return reply.status(500).send({
      success: false,
      message: "Server error in uploading resume",
    });
  }
}

export async function analyzeResume(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { resumeUrl, github, portfolio } = req.body as {
      resumeUrl: string;
      github: string;
      portfolio: string;
      linkedin: string;
    };

    if (!resumeUrl) {
      return reply.code(400).send({ message: "resumeUrl is required" });
    }

    if (!req.user?.id) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    const resume = await parseResumeService({
      resumeUrl,
      github,
      portfolio,
      linkedin,
      userId: req.user.id,
    });

    return reply.status(200).send({
      success: true,
      message: "Resume parsed successfully"
    })

  } catch (err) {
    req.log.error(err);

    return reply.code(500).send({
      success: false,
      message: "Server error in parsing uploaded resume",
    });
  }
}