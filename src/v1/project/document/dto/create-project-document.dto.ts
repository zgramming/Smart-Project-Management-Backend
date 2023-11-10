import { ActiveStatusEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateProjectDocumentDto {
  @Transform((o) => Number(o.value))
  @IsNumber()
  projectId: number;

  @IsString()
  name: string;

  @ValidateIf((o) => o.description !== undefined)
  @IsString()
  description?: string;

  status?: ActiveStatusEnum;

  @Transform((o) => Number(o.value))
  @IsNumber()
  createdBy: number;
}
