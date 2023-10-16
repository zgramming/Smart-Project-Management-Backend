/*
  Warnings:

  - Added the required column `master_category_code` to the `master_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "master_category" ADD COLUMN     "master_category_code" TEXT NOT NULL;
