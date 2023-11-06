/*
  Warnings:

  - The values [READ] on the enum `AccessMenuAllowedEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccessMenuAllowedEnum_new" AS ENUM ('CREATE', 'VIEW', 'UPDATE', 'DELETE', 'PRINT', 'EXPORT', 'IMPORT', 'APPROVE');
ALTER TABLE "access_menus" ALTER COLUMN "allowed_access" TYPE "AccessMenuAllowedEnum_new"[] USING ("allowed_access"::text::"AccessMenuAllowedEnum_new"[]);
ALTER TYPE "AccessMenuAllowedEnum" RENAME TO "AccessMenuAllowedEnum_old";
ALTER TYPE "AccessMenuAllowedEnum_new" RENAME TO "AccessMenuAllowedEnum";
DROP TYPE "AccessMenuAllowedEnum_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "access_category_moduls" DROP CONSTRAINT "access_category_moduls_role_id_fkey";

-- DropForeignKey
ALTER TABLE "access_menus" DROP CONSTRAINT "access_menus_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "access_menus" DROP CONSTRAINT "access_menus_modul_id_fkey";

-- DropForeignKey
ALTER TABLE "access_moduls" DROP CONSTRAINT "access_moduls_modul_id_fkey";

-- DropForeignKey
ALTER TABLE "master_category" DROP CONSTRAINT "master_category_parent_master_category_id_fkey";

-- DropForeignKey
ALTER TABLE "master_data" DROP CONSTRAINT "master_data_master_category_id_fkey";

-- DropForeignKey
ALTER TABLE "master_data" DROP CONSTRAINT "master_data_parent_master_data_id_fkey";

-- DropForeignKey
ALTER TABLE "menus" DROP CONSTRAINT "menus_modul_id_fkey";

-- DropForeignKey
ALTER TABLE "menus" DROP CONSTRAINT "menus_parent_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "moduls" DROP CONSTRAINT "moduls_category_modul_id_fkey";

-- AddForeignKey
ALTER TABLE "moduls" ADD CONSTRAINT "moduls_category_modul_id_fkey" FOREIGN KEY ("category_modul_id") REFERENCES "category_moduls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_parent_menu_id_fkey" FOREIGN KEY ("parent_menu_id") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_modul_id_fkey" FOREIGN KEY ("modul_id") REFERENCES "moduls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_category_moduls" ADD CONSTRAINT "access_category_moduls_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_moduls" ADD CONSTRAINT "access_moduls_modul_id_fkey" FOREIGN KEY ("modul_id") REFERENCES "moduls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_menus" ADD CONSTRAINT "access_menus_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_menus" ADD CONSTRAINT "access_menus_modul_id_fkey" FOREIGN KEY ("modul_id") REFERENCES "moduls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_category" ADD CONSTRAINT "master_category_parent_master_category_id_fkey" FOREIGN KEY ("parent_master_category_id") REFERENCES "master_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_data" ADD CONSTRAINT "master_data_parent_master_data_id_fkey" FOREIGN KEY ("parent_master_data_id") REFERENCES "master_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_data" ADD CONSTRAINT "master_data_master_category_id_fkey" FOREIGN KEY ("master_category_id") REFERENCES "master_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
