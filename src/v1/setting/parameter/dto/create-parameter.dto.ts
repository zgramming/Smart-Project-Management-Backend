import { ActiveStatusEnum } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateParameterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  value: string;

  description?: string;
  status?: ActiveStatusEnum;
}
