import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessModulDto } from './create-access-modul.dto';

export class UpdateAccessModulDto extends PartialType(CreateAccessModulDto) {}
