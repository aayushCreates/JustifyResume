import { Readable } from "stream";
import cloudinary from "../config/cloudinary.config";

export default async function uploadPdfToCloudinary(fileStream: Readable) {
  return new Promise((resolve: any, reject: any) => {
    const uploadStream = cloudinary.uploader.upload_stream(
        {
            folder: "resumes",
            resource_type: "raw",
            format: "pdf",
        },
        (error, result) => {
            if (error) return reject(error)
            resolve(result)
        }
    );

    fileStream.pipe(uploadStream);
  });
}
