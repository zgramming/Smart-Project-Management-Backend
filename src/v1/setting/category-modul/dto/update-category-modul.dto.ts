import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryModulDto } from './create-category-modul.dto';

export class UpdateCategoryModulDto extends PartialType(CreateCategoryModulDto) {}
