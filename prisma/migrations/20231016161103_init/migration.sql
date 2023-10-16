/*
  Warnings:

  - You are about to drop the column `category_id` on the `moduls` table. All the data in the column will be lost.
  - Added the required column `category_modul_id` to the `moduls` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "moduls" DROP CONSTRAINT "moduls_category_id_fkey";

-- AlterTable
ALTER TABLE "moduls" DROP COLUMN "category_id",
ADD COLUMN     "category_modul_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "moduls" ADD CONSTRAINT "moduls_category_modul_id_fkey" FOREIGN KEY ("category_modul_id") REFERENCES "category_moduls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
