/*
  Warnings:

  - You are about to drop the column `endDate` on the `project_meetings` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `project_meetings` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `project_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `project_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `projects` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `project_meeting_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `project_meetings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `project_meetings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `project_tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `project_tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_meeting_members" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "project_meetings" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "project_tasks" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "project_meeting_members" ADD CONSTRAINT "project_meeting_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
