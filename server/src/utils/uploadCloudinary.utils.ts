import cloudinary from "../config/cloudinary.config";
import streamifier from "streamifier";

export default async function uploadToCloudinary(buffer: Buffer) {
  return new Promise<any> ((resolve: any, reject: any) => {
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

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}
