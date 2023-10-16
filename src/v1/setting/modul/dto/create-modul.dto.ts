import { ActiveStatusEnum } from '@prisma/client';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateModulDto {
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
