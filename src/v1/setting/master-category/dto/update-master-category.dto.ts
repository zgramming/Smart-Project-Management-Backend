import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterCategoryDto } from './create-master-category.dto';

export class UpdateMasterCategoryDto extends PartialType(CreateMasterCategoryDto) {}
