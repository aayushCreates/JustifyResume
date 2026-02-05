/*
  Warnings:

  - Changed the type of `severity` on the `RedFlag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RedFlagSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "RedFlag" DROP COLUMN "severity",
ADD COLUMN     "severity" "RedFlagSeverity" NOT NULL;

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "analysisMeta" JSONB;

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
