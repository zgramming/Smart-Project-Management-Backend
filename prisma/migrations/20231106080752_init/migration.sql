/*
  Warnings:

  - The `status` column on the `project_tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProjectTaskStatusEnum" AS ENUM ('FINISH', 'PENDING', 'ON_PROGRESS', 'NEED_HELP', 'CANCEL');

-- AlterTable
ALTER TABLE "project_tasks" DROP COLUMN "status",
ADD COLUMN     "status" "ProjectTaskStatusEnum" NOT NULL DEFAULT 'ON_PROGRESS';
