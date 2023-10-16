import { Injectable } from '@nestjs/common';
import { CreateMasterCategoryDto } from './dto/create-master-category.dto';
import { UpdateMasterCategoryDto } from './dto/update-master-category.dto';

@Injectable()
export class MasterCategoryService {
  create(createMasterCategoryDto: CreateMasterCategoryDto) {
    return 'This action adds a new masterCategory';
  }

  findAll() {
    return `This action returns all masterCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterCategory`;
  }

  update(id: number, updateMasterCategoryDto: UpdateMasterCategoryDto) {
    return `This action updates a #${id} masterCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterCategory`;
  }
}
