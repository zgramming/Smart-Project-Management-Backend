import { AccessMenuAllowedEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class Values {
  @IsNotEmpty()
  @IsInt()
  roleId: number;

  @IsNotEmpty()
  @IsInt()
  menuId: number;

  @IsNotEmpty()
  @IsInt()
  modulId: number;

  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @ArrayMinSize(1)
  allowedAccess: AccessMenuAllowedEnum[];
}

export class CreateAccessMenuDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Values)
  values: Values[];
}
