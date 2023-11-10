/*
  Warnings:

  - Added the required column `created_by` to the `project_clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `project_documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `project_meetings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `project_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `project_tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "project_members" DROP CONSTRAINT "project_members_user_id_fkey";

-- AlterTable
ALTER TABLE "project_clients" ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "status" "ActiveStatusEnum" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "updated_by" INTEGER;

-- AlterTable
ALTER TABLE "project_documents" ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "updated_by" INTEGER;

-- AlterTable
ALTER TABLE "project_meetings" ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "updated_by" INTEGER;

-- AlterTable
ALTER TABLE "project_members" ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "updated_by" INTEGER;

-- AlterTable
ALTER TABLE "project_tasks" ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "updated_by" INTEGER;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "updated_by" INTEGER;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_clients" ADD CONSTRAINT "project_clients_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_clients" ADD CONSTRAINT "project_clients_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_documents" ADD CONSTRAINT "project_documents_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_documents" ADD CONSTRAINT "project_documents_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_meetings" ADD CONSTRAINT "project_meetings_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_meetings" ADD CONSTRAINT "project_meetings_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tasks" ADD CONSTRAINT "project_tasks_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tasks" ADD CONSTRAINT "project_tasks_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
