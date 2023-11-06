import { ActiveStatusEnum, MeetingMethodEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateProjectMeetingDto {
  @IsNumber()
  @IsNotEmpty()
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

  @IsEnum(MeetingMethodEnum)
  method: MeetingMethodEnum;

  @IsString()
  @IsNotEmpty()
  link: string;

  @ValidateIf((o) => o.status !== undefined)
  @IsEnum(ActiveStatusEnum)
  status?: ActiveStatusEnum;
}
