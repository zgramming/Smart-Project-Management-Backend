import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryModulService } from './category-modul.service';
import { CreateCategoryModulDto } from './dto/create-category-modul.dto';
import { UpdateCategoryModulDto } from './dto/update-category-modul.dto';

@Controller('category-modul')
export class CategoryModulController {
  constructor(private readonly categoryModulService: CategoryModulService) {}

  @Post()
  create(@Body() createCategoryModulDto: CreateCategoryModulDto) {
    return this.categoryModulService.create(createCategoryModulDto);
  }

  @Get()
  findAll() {
    return this.categoryModulService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryModulService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryModulDto: UpdateCategoryModulDto) {
    return this.categoryModulService.update(+id, updateCategoryModulDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryModulService.remove(+id);
  }
}
