import { Injectable } from '@nestjs/common';
import { CreateAccessMenuDto } from './dto/create-access-menu.dto';
import { UpdateAccessMenuDto } from './dto/update-access-menu.dto';

@Injectable()
export class AccessMenuService {
  create(createAccessMenuDto: CreateAccessMenuDto) {
    return 'This action adds a new accessMenu';
  }

  findAll() {
    return `This action returns all accessMenu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessMenu`;
  }

  update(id: number, updateAccessMenuDto: UpdateAccessMenuDto) {
    return `This action updates a #${id} accessMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessMenu`;
  }
}
