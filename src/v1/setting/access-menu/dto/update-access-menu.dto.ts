import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessMenuDto } from './create-access-menu.dto';

export class UpdateAccessMenuDto extends PartialType(CreateAccessMenuDto) {}
