import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterDatumDto } from './master-data-create.dto';

export class UpdateMasterDatumDto extends PartialType(CreateMasterDatumDto) {}
