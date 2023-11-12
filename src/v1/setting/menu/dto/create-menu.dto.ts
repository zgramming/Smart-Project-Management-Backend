import { ActiveStatusEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @Transform(({ value }) => Number(value))
  parentMenuId?: number;

  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @IsInt()
  modulId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  prefix: string;

  description?: string;
  status?: ActiveStatusEnum;
}
