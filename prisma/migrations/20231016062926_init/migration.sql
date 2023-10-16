/*
  Warnings:

  - You are about to drop the column `createdAt` on the `access_menus` table. All the data in the column will be lost.
  - You are about to drop the column `menuId` on the `access_menus` table. All the data in the column will be lost.
  - You are about to drop the column `modulId` on the `access_menus` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `access_menus` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `access_menus` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `access_moduls` table. All the data in the column will be lost.
  - You are about to drop the column `modulId` on the `access_moduls` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `access_moduls` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `access_moduls` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `category_moduls` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `category_moduls` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `master_category` table. All the data in the column will be lost.
  - You are about to drop the column `parentMasterCategoryId` on the `master_category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `master_category` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `master_data` table. All the data in the column will be lost.
  - You are about to drop the column `masterCategoryId` on the `master_data` table. All the data in the column will be lost.
  - You are about to drop the column `parentMasterDataId` on the `master_data` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `master_data` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `modulId` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `parentMenuId` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `moduls` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `moduls` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `moduls` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `parameters` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `parameters` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `menu_id` to the `access_menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modul_id` to the `access_menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `access_menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `access_menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modul_id` to the `access_moduls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `access_moduls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `access_moduls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `category_moduls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `master_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `master_category_id` to the `master_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `master_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modul_id` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `moduls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `moduls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `parameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "access_menus" DROP CONSTRAINT "access_menus_menuId_fkey";

-- DropForeignKey
ALTER TABLE "access_menus" DROP CONSTRAINT "access_menus_modulId_fkey";

-- DropForeignKey
ALTER TABLE "access_menus" DROP CONSTRAINT "access_menus_roleId_fkey";

-- DropForeignKey
ALTER TABLE "access_moduls" DROP CONSTRAINT "access_moduls_modulId_fkey";

-- DropForeignKey
ALTER TABLE "access_moduls" DROP CONSTRAINT "access_moduls_roleId_fkey";

-- DropForeignKey
ALTER TABLE "master_category" DROP CONSTRAINT "master_category_parentMasterCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "master_data" DROP CONSTRAINT "master_data_masterCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "master_data" DROP CONSTRAINT "master_data_parentMasterDataId_fkey";

-- DropForeignKey
ALTER TABLE "menus" DROP CONSTRAINT "menus_modulId_fkey";

-- DropForeignKey
ALTER TABLE "menus" DROP CONSTRAINT "menus_parentMenuId_fkey";

-- DropForeignKey
ALTER TABLE "moduls" DROP CONSTRAINT "moduls_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roleId_fkey";

-- AlterTable
ALTER TABLE "access_menus" DROP COLUMN "createdAt",
DROP COLUMN "menuId",
DROP COLUMN "modulId",
DROP COLUMN "roleId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "menu_id" INTEGER NOT NULL,
ADD COLUMN     "modul_id" INTEGER NOT NULL,
ADD COLUMN     "role_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "access_moduls" DROP COLUMN "createdAt",
DROP COLUMN "modulId",
DROP COLUMN "roleId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modul_id" INTEGER NOT NULL,
ADD COLUMN     "role_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "category_moduls" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "master_category" DROP COLUMN "createdAt",
DROP COLUMN "parentMasterCategoryId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "parent_master_category_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "master_data" DROP COLUMN "createdAt",
DROP COLUMN "masterCategoryId",
DROP COLUMN "parentMasterDataId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "master_category_id" INTEGER NOT NULL,
ADD COLUMN     "parent_master_data_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "menus" DROP COLUMN "createdAt",
DROP COLUMN "modulId",
DROP COLUMN "parentMenuId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modul_id" INTEGER NOT NULL,
ADD COLUMN     "parent_menu_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "moduls" DROP COLUMN "categoryId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "parameters" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "roleId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moduls" ADD CONSTRAINT "moduls_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category_moduls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_parent_menu_id_fkey" FOREIGN KEY ("parent_menu_id") REFERENCES "menus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_modul_id_fkey" FOREIGN KEY ("modul_id") REFERENCES "moduls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_moduls" ADD CONSTRAINT "access_moduls_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_moduls" ADD CONSTRAINT "access_moduls_modul_id_fkey" FOREIGN KEY ("modul_id") REFERENCES "moduls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_menus" ADD CONSTRAINT "access_menus_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_menus" ADD CONSTRAINT "access_menus_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_menus" ADD CONSTRAINT "access_menus_modul_id_fkey" FOREIGN KEY ("modul_id") REFERENCES "moduls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_category" ADD CONSTRAINT "master_category_parent_master_category_id_fkey" FOREIGN KEY ("parent_master_category_id") REFERENCES "master_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_data" ADD CONSTRAINT "master_data_parent_master_data_id_fkey" FOREIGN KEY ("parent_master_data_id") REFERENCES "master_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_data" ADD CONSTRAINT "master_data_master_category_id_fkey" FOREIGN KEY ("master_category_id") REFERENCES "master_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
