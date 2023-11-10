import { ActiveStatusEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';

class Values {
  @IsNumber()
  projectId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  createdBy: number;

  status?: ActiveStatusEnum;
}

export class CreateProjectMemberDto {
  @IsArray({ message: `Project Member must be an array` })
  @ArrayMinSize(1, { message: `Project Member must be at least 1` })
  @ValidateNested({
    each: true,
  })
  @Type(() => Values)
  members: Values[];
}
