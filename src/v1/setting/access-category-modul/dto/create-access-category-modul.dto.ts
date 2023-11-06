import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';

class CategoryModul {
  @IsNumber()
  roleId: number;

  @IsNumber()
  categoryModulId: number;
}

export class CreateAccessCategoryModulDto {
  @ArrayMinSize(1)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryModul)
  values: CategoryModul[];
}
