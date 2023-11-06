/*
  Warnings:

  - Added the required column `category_modul_id` to the `access_moduls` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- AlterTable
ALTER TABLE "access_moduls" ADD COLUMN     "category_modul_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_moduls" ADD CONSTRAINT "access_moduls_category_modul_id_fkey" FOREIGN KEY ("category_modul_id") REFERENCES "category_moduls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
