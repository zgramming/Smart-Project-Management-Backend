-- DropForeignKey
ALTER TABLE "access_category_moduls" DROP CONSTRAINT "access_category_moduls_role_id_fkey";

-- DropForeignKey
ALTER TABLE "access_menus" DROP CONSTRAINT "access_menus_role_id_fkey";

-- DropForeignKey
ALTER TABLE "access_moduls" DROP CONSTRAINT "access_moduls_role_id_fkey";

-- AddForeignKey
ALTER TABLE "access_category_moduls" ADD CONSTRAINT "access_category_moduls_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_moduls" ADD CONSTRAINT "access_moduls_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_menus" ADD CONSTRAINT "access_menus_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
