/*
  Warnings:

  - Made the column `link` on table `project_meetings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "project_meetings" ALTER COLUMN "link" SET NOT NULL;
