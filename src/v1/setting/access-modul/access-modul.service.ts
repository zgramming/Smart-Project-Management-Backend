import { Injectable } from '@nestjs/common';
import { CreateAccessModulDto } from './dto/create-access-modul.dto';
import { UpdateAccessModulDto } from './dto/update-access-modul.dto';

@Injectable()
export class AccessModulService {
  create(createAccessModulDto: CreateAccessModulDto) {
    return 'This action adds a new accessModul';
  }

  findAll() {
    return `This action returns all accessModul`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessModul`;
  }

  update(id: number, updateAccessModulDto: UpdateAccessModulDto) {
    return `This action updates a #${id} accessModul`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessModul`;
  }
}
