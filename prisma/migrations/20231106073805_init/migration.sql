-- DropForeignKey
ALTER TABLE "project_documents" DROP CONSTRAINT "project_documents_project_id_fkey";

-- DropForeignKey
ALTER TABLE "project_meeting_members" DROP CONSTRAINT "project_meeting_members_project_meeting_id_fkey";

-- DropForeignKey
ALTER TABLE "project_meetings" DROP CONSTRAINT "project_meetings_project_id_fkey";

-- DropForeignKey
ALTER TABLE "project_members" DROP CONSTRAINT "project_members_project_id_fkey";

-- DropForeignKey
ALTER TABLE "project_tasks" DROP CONSTRAINT "project_tasks_project_id_fkey";

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_documents" ADD CONSTRAINT "project_documents_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_meetings" ADD CONSTRAINT "project_meetings_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_meeting_members" ADD CONSTRAINT "project_meeting_members_project_meeting_id_fkey" FOREIGN KEY ("project_meeting_id") REFERENCES "project_meetings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tasks" ADD CONSTRAINT "project_tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
