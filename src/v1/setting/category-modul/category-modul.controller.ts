import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryModulService } from './category-modul.service';
import { CreateCategoryModulDto } from './dto/create-category-modul.dto';
import { UpdateCategoryModulDto } from './dto/update-category-modul.dto';
import { prefixSettingUrl } from 'src/utils/constant';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';

@UseGuards(ValidateJWTGuard)
@Controller(`${prefixSettingUrl}/category-modul`)
export class CategoryModulController {
  constructor(private readonly categoryModulService: CategoryModulService) {}

  @Post()
  async create(@Body() createCategoryModulDto: CreateCategoryModulDto) {
    return this.categoryModulService.create(createCategoryModulDto);
  }

  @Get()
  async findAll(@Query() query: any) {
    const { limit = 100, page = 1 } = query;
    return this.categoryModulService.findAll({
      limit: Number(limit),
      page: Number(page),
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryModulService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryModulDto: UpdateCategoryModulDto,
  ) {
    return this.categoryModulService.update(+id, updateCategoryModulDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryModulService.remove(+id);
  }
}
