import {
  ActiveStatusEnum,
  ApproveStatusEnum,
  ProjectStatusEnum,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class ProjectMember {
  @IsNumber()
  userId: number;

  @IsNumber()
  createdBy: number;

  status?: ActiveStatusEnum;
}

export class CreateProjectDto {
  @IsString()
  clientId: string;

  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  status?: ProjectStatusEnum;

  approveStatus?: ApproveStatusEnum;

  @IsNumber()
  createdBy: number;

  @IsArray({ message: `Project Member must be an array` })
  @ValidateNested({
    each: true,
  })
  @Type(() => ProjectMember)
  members: ProjectMember[];
}
