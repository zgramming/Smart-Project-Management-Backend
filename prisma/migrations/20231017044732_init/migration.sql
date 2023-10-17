/*
  Warnings:

  - You are about to drop the column `master_category_code` on the `master_category` table. All the data in the column will be lost.
  - Added the required column `master_category_code` to the `master_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "master_category" DROP COLUMN "master_category_code";

-- AlterTable
ALTER TABLE "master_data" ADD COLUMN     "master_category_code" TEXT NOT NULL;
