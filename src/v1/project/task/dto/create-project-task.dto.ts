import { DegreeOfDifficultyEnum, ProjectTaskStatusEnum } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';

export class CreateProjectTaskDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  projectId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => o.description !== undefined)
  @IsNotEmpty()
  description?: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsEnum(DegreeOfDifficultyEnum)
  degreeOfDifficulty: DegreeOfDifficultyEnum;

  @ValidateIf((o) => o.link_task !== undefined)
  @IsString()
  @IsUrl()
  link_task?: string;

  @ValidateIf((o) => o.status !== undefined)
  @IsEnum(ProjectTaskStatusEnum)
  status?: ProjectTaskStatusEnum;

  @IsNumber()
  createdBy: number;
}
