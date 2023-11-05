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
import { MasterCategoryService } from './master-category.service';
import { CreateMasterCategoryDto } from './dto/create-master-category.dto';
import { UpdateMasterCategoryDto } from './dto/update-master-category.dto';
import { prefixSettingUrl } from 'src/utils/constant';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';

@UseGuards(ValidateJWTGuard)
@Controller(`${prefixSettingUrl}/master-category`)
export class MasterCategoryController {
  constructor(private readonly masterCategoryService: MasterCategoryService) {}

  @Post()
  create(@Body() createMasterCategoryDto: CreateMasterCategoryDto) {
    return this.masterCategoryService.create(createMasterCategoryDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const { limit = 100, page = 1 } = query;
    return this.masterCategoryService.findAll({
      limit: Number(limit),
      page: Number(page),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterCategoryService.findOne(+id);
  }

  @Get('code/:code')
  findByCode(@Param('code') code: string) {
    return this.masterCategoryService.findByCode(code);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMasterCategoryDto: UpdateMasterCategoryDto,
  ) {
    return this.masterCategoryService.update(+id, updateMasterCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterCategoryService.remove(+id);
  }
}
