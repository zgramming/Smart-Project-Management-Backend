import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessCategoryModulDto } from './create-access-category-modul.dto';

export class UpdateAccessCategoryModulDto extends PartialType(
  CreateAccessCategoryModulDto,
) {}
