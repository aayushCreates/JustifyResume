import { FastifyReply, FastifyRequest } from "fastify";
import uploadPdfToCloudinary from "../utils/uploadCloudinary.utils";

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

    reply.send({
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
