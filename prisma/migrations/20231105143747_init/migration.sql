/*
  Warnings:

  - The `status` column on the `project_members` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "project_members" DROP COLUMN "status",
ADD COLUMN     "status" "ActiveStatusEnum" NOT NULL DEFAULT 'ACTIVE';
