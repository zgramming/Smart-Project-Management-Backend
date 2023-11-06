-- CreateTable
CREATE TABLE "access_category_moduls" (
    "id" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "category_modul_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "access_category_moduls_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "access_category_moduls" ADD CONSTRAINT "access_category_moduls_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_category_moduls" ADD CONSTRAINT "access_category_moduls_category_modul_id_fkey" FOREIGN KEY ("category_modul_id") REFERENCES "category_moduls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
