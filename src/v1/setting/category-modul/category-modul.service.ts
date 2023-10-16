import { Injectable } from '@nestjs/common';
import { CreateCategoryModulDto } from './dto/create-category-modul.dto';
import { UpdateCategoryModulDto } from './dto/update-category-modul.dto';

@Injectable()
export class CategoryModulService {
  create(createCategoryModulDto: CreateCategoryModulDto) {
    return 'This action adds a new categoryModul';
  }

  findAll() {
    return `This action returns all categoryModul`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryModul`;
  }

  update(id: number, updateCategoryModulDto: UpdateCategoryModulDto) {
    return `This action updates a #${id} categoryModul`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryModul`;
  }
}
