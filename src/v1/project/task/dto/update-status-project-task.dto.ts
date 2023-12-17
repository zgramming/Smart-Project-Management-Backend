import { ProjectTaskStatusEnum } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateStatusProjectTaskDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(ProjectTaskStatusEnum)
  status: ProjectTaskStatusEnum;

  @IsNotEmpty()
  linkTask: string;
}
