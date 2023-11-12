import { ActiveStatusEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateModulDto {
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  categoryModulId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  prefix: string;

  description?: string;
  status?: ActiveStatusEnum;
}
