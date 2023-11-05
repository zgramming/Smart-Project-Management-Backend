import { ProjectStatusEnum } from '@prisma/client';
import { IsDateString, IsString } from 'class-validator';

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
}
