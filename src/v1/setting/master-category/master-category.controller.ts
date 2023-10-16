import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MasterCategoryService } from './master-category.service';
import { CreateMasterCategoryDto } from './dto/create-master-category.dto';
import { UpdateMasterCategoryDto } from './dto/update-master-category.dto';

@Controller('master-category')
export class MasterCategoryController {
  constructor(private readonly masterCategoryService: MasterCategoryService) {}

  @Post()
  create(@Body() createMasterCategoryDto: CreateMasterCategoryDto) {
    return this.masterCategoryService.create(createMasterCategoryDto);
  }

  @Get()
  findAll() {
    return this.masterCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterCategoryDto: UpdateMasterCategoryDto) {
    return this.masterCategoryService.update(+id, updateMasterCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterCategoryService.remove(+id);
  }
}
