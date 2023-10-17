import { ActiveStatusEnum } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateMasterCategoryDto {
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
