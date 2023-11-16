-- CreateEnum
CREATE TYPE "ApproveStatusEnum" AS ENUM ('APPROVED', 'REJECTED', 'PENDING');

-- AlterTable
ALTER TABLE "project_tasks" ADD COLUMN     "approve_status" "ApproveStatusEnum" NOT NULL DEFAULT 'PENDING';
