-- CreateTable
CREATE TABLE "project_task_histories" (
    "id" TEXT NOT NULL,
    "project_task_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "description" TEXT,
    "status" "ProjectTaskStatusEnum" NOT NULL DEFAULT 'ON_PROGRESS',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_task_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_task_histories" ADD CONSTRAINT "project_task_histories_project_task_id_fkey" FOREIGN KEY ("project_task_id") REFERENCES "project_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_task_histories" ADD CONSTRAINT "project_task_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
