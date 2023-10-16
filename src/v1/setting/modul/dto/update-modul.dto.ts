import { PartialType } from '@nestjs/mapped-types';
import { CreateModulDto } from './create-modul.dto';

export class UpdateModulDto extends PartialType(CreateModulDto) {}
