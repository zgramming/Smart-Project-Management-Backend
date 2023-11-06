import { ActiveStatusEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateProjectDocumentDto {
  @IsNumber()
  @Transform((o) => Number(o.value))
  projectId: number;

  @IsString()
  name: string;

  @ValidateIf((o) => o.description !== undefined)
  @IsString()
  description?: string;

  status?: ActiveStatusEnum;
}
