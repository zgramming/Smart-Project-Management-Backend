import { DegreeOfDifficultyEnum, ProjectTaskStatusEnum } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
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

  @ValidateIf((o) => o.status !== undefined)
  @IsEnum(ProjectTaskStatusEnum)
  status?: ProjectTaskStatusEnum;

  @IsNumber()
  createdBy: number;
}
