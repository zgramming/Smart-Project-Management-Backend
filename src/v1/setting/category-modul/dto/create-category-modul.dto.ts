import { ActiveStatusEnum } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryModulDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  prefix: string;

  description?: string;
  status?: ActiveStatusEnum;
}
