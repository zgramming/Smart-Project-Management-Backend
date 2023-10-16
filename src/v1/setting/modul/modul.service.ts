import { Injectable } from '@nestjs/common';
import { CreateModulDto } from './dto/create-modul.dto';
import { UpdateModulDto } from './dto/update-modul.dto';

@Injectable()
export class ModulService {
  create(createModulDto: CreateModulDto) {
    return 'This action adds a new modul';
  }

  findAll() {
    return `This action returns all modul`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modul`;
  }

  update(id: number, updateModulDto: UpdateModulDto) {
    return `This action updates a #${id} modul`;
  }

  remove(id: number) {
    return `This action removes a #${id} modul`;
  }
}
