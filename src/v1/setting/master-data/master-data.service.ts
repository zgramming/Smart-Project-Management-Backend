import { Injectable } from '@nestjs/common';
import { CreateMasterDatumDto } from './dto/create-master-datum.dto';
import { UpdateMasterDatumDto } from './dto/update-master-datum.dto';

@Injectable()
export class MasterDataService {
  create(createMasterDatumDto: CreateMasterDatumDto) {
    return 'This action adds a new masterDatum';
  }

  findAll() {
    return `This action returns all masterData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterDatum`;
  }

  update(id: number, updateMasterDatumDto: UpdateMasterDatumDto) {
    return `This action updates a #${id} masterDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterDatum`;
  }
}
