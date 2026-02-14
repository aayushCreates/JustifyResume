-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "fileUrl" TEXT,
ALTER COLUMN "rawText" DROP NOT NULL;
