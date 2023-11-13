import { ActiveStatusEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateMasterCategoryDto {
  @Transform(({ value }) => Number(value))
  @ValidateIf((o) => {
    const result = o.parentMasterCategoryId !== undefined;
    return result;
  })
  @IsInt()
  parentMasterCategoryId?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @ValidateIf((o) => o.description !== undefined)
  @IsString()
  description?: string;

  status?: ActiveStatusEnum;
}
