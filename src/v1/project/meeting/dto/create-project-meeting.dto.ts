import { ActiveStatusEnum, MeetingMethodEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class MeetingMember {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

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

  @IsNumber()
  createdBy: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MeetingMember)
  members: MeetingMember[];
}
