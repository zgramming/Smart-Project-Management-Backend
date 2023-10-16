-- CreateEnum
CREATE TYPE "ActiveStatusEnum" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "UserStatusEnum" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPEND');

-- CreateEnum
CREATE TYPE "AccessMenuAllowedEnum" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE', 'PRINT', 'EXPORT', 'IMPORT', 'APPROVE');

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "status" "ActiveStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "status" "UserStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_moduls" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "status" "ActiveStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "prefix" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_moduls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moduls" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "status" "ActiveStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "prefix" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "moduls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "parentMenuId" INTEGER,
    "modulId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "status" "ActiveStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "prefix" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_moduls" (
    "id" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "modulId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "access_moduls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_menus" (
    "id" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "modulId" INTEGER NOT NULL,
    "allowed_access" "AccessMenuAllowedEnum"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "access_menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_category" (
    "id" SERIAL NOT NULL,
    "parentMasterCategoryId" INTEGER,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "status" "ActiveStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_data" (
    "id" SERIAL NOT NULL,
    "parentMasterDataId" INTEGER,
    "masterCategoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "status" "ActiveStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "parameter1_key" TEXT,
    "parameter1_value" TEXT,
    "parameter2_key" TEXT,
    "parameter2_value" TEXT,
    "parameter3_key" TEXT,
    "parameter3_value" TEXT,
    "parameter4_key" TEXT,
    "parameter4_value" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parameters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "status" "ActiveStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parameters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_code_key" ON "roles"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "category_moduls_code_key" ON "category_moduls"("code");

-- CreateIndex
CREATE UNIQUE INDEX "category_moduls_prefix_key" ON "category_moduls"("prefix");

-- CreateIndex
CREATE UNIQUE INDEX "moduls_code_key" ON "moduls"("code");

-- CreateIndex
CREATE UNIQUE INDEX "moduls_prefix_key" ON "moduls"("prefix");

-- CreateIndex
CREATE UNIQUE INDEX "menus_code_key" ON "menus"("code");

-- CreateIndex
CREATE UNIQUE INDEX "menus_prefix_key" ON "menus"("prefix");

-- CreateIndex
CREATE UNIQUE INDEX "master_category_code_key" ON "master_category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "master_data_code_key" ON "master_data"("code");

-- CreateIndex
CREATE UNIQUE INDEX "parameters_code_key" ON "parameters"("code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moduls" ADD CONSTRAINT "moduls_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category_moduls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_parentMenuId_fkey" FOREIGN KEY ("parentMenuId") REFERENCES "menus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_modulId_fkey" FOREIGN KEY ("modulId") REFERENCES "moduls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_moduls" ADD CONSTRAINT "access_moduls_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_moduls" ADD CONSTRAINT "access_moduls_modulId_fkey" FOREIGN KEY ("modulId") REFERENCES "moduls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_menus" ADD CONSTRAINT "access_menus_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_menus" ADD CONSTRAINT "access_menus_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_menus" ADD CONSTRAINT "access_menus_modulId_fkey" FOREIGN KEY ("modulId") REFERENCES "moduls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_category" ADD CONSTRAINT "master_category_parentMasterCategoryId_fkey" FOREIGN KEY ("parentMasterCategoryId") REFERENCES "master_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_data" ADD CONSTRAINT "master_data_parentMasterDataId_fkey" FOREIGN KEY ("parentMasterDataId") REFERENCES "master_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_data" ADD CONSTRAINT "master_data_masterCategoryId_fkey" FOREIGN KEY ("masterCategoryId") REFERENCES "master_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
