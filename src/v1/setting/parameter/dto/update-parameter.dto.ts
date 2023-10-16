import { PartialType } from '@nestjs/mapped-types';
import { CreateParameterDto } from './create-parameter.dto';

export class UpdateParameterDto extends PartialType(CreateParameterDto) {}
