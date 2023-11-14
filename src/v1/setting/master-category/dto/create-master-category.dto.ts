import { ActiveStatusEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateMasterCategoryDto {
  @ValidateIf((o) => {
    const result = o.parentMasterCategoryId !== undefined;
    return result;
  })
  @IsInt()
  @Transform(({ value }) => {
    if (!value) return value;
    return Number(value);
  })
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
