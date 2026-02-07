/*
  Warnings:

  - Added the required column `verdict` to the `SkillScore` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SkillVerdict" AS ENUM ('VERIFIED', 'PARTIAL', 'UNVERIFIED');

-- AlterTable
ALTER TABLE "SkillScore" ADD COLUMN     "evidence" JSONB,
ADD COLUMN     "verdict" "SkillVerdict" NOT NULL;
