-- DropForeignKey
ALTER TABLE "project_meeting_members" DROP CONSTRAINT "project_meeting_members_user_id_fkey";

-- AddForeignKey
ALTER TABLE "project_meeting_members" ADD CONSTRAINT "project_meeting_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
