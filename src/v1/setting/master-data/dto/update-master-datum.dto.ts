import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterDatumDto } from './create-master-datum.dto';

export class UpdateMasterDatumDto extends PartialType(CreateMasterDatumDto) {}
