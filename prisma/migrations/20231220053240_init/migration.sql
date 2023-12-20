/*
  Warnings:

  - The values [NEED_HELP] on the enum `ProjectTaskStatusEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectTaskStatusEnum_new" AS ENUM ('FINISH', 'PENDING', 'ON_PROGRESS', 'REVISION', 'CANCEL');
ALTER TABLE "project_tasks" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "project_task_histories" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "project_tasks" ALTER COLUMN "status" TYPE "ProjectTaskStatusEnum_new" USING ("status"::text::"ProjectTaskStatusEnum_new");
ALTER TABLE "project_task_histories" ALTER COLUMN "status" TYPE "ProjectTaskStatusEnum_new" USING ("status"::text::"ProjectTaskStatusEnum_new");
ALTER TYPE "ProjectTaskStatusEnum" RENAME TO "ProjectTaskStatusEnum_old";
ALTER TYPE "ProjectTaskStatusEnum_new" RENAME TO "ProjectTaskStatusEnum";
DROP TYPE "ProjectTaskStatusEnum_old";
ALTER TABLE "project_tasks" ALTER COLUMN "status" SET DEFAULT 'ON_PROGRESS';
ALTER TABLE "project_task_histories" ALTER COLUMN "status" SET DEFAULT 'ON_PROGRESS';
COMMIT;
