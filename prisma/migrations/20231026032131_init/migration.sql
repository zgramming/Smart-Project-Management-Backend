-- CreateEnum
CREATE TYPE "ProjectStatusEnum" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPEND', 'FINISH');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "status" "ProjectStatusEnum" NOT NULL DEFAULT 'ACTIVE';
