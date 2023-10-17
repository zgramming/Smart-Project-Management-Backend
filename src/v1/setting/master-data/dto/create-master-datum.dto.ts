import { ActiveStatusEnum } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateMasterDatumDto {
  @ValidateIf((o) => o.parentMasterDataId !== undefined)
  @IsInt()
  parentMasterDataId?: number;

  @IsNotEmpty()
  @IsInt()
  masterCategoryId: number;

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

  @ValidateIf((o) => o.parameter1_key !== undefined)
  @IsString()
  parameter1_key?: string;

  @ValidateIf((o) => o.parameter1_value !== undefined)
  @IsString()
  parameter1_value?: string;

  @ValidateIf((o) => o.parameter2_key !== undefined)
  @IsString()
  parameter2_key?: string;

  @ValidateIf((o) => o.parameter2_value !== undefined)
  @IsString()
  parameter2_value?: string;

  @ValidateIf((o) => o.parameter3_key !== undefined)
  @IsString()
  parameter3_key?: string;

  @ValidateIf((o) => o.parameter3_value !== undefined)
  @IsString()
  parameter3_value?: string;

  @ValidateIf((o) => o.parameter4_key !== undefined)
  @IsString()
  parameter4_key?: string;

  @ValidateIf((o) => o.parameter4_value !== undefined)
  @IsString()
  parameter4_value?: string;
}
