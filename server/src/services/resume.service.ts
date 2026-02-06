import { PrismaClient } from "@prisma/client";
import getPdfInfo from "../utils/infoParser.utils";
import parseResumeText from "../utils/parseResume.utils";

const prisma = new PrismaClient();

export async function parseResumeService({
  resumeUrl,
  github,
  portfolio,
  linkedin,
  userId,
}: {
  resumeUrl: string;
  github?: string;
  portfolio?: string;
  linkedin?: string;
  userId: string;
}) {
  const rawText = await getPdfInfo(resumeUrl) as any;

  const parsedJson = parseResumeText(rawText, github as string, portfolio as string, linkedin as string);

  const resume = await prisma.resume.create({
    data: {
      rawText: rawText.text,
      parsedJson: parsedJson as any,
      userId: userId,
    },
  });

  return resume;
}
