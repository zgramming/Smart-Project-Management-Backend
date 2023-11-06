import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

class TypeValues {
  @IsInt()
  @IsNotEmpty()
  roleId: number;

  @IsInt()
  @IsNotEmpty()
  modulId: number;

  @IsInt()
  @IsNotEmpty()
  categoryModulId: number;
}

export class CreateAccessModulDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TypeValues)
  values: TypeValues[];
}
