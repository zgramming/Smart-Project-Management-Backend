import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { prefixSettingUrl } from 'src/utils/constant';

@Controller(`${prefixSettingUrl}/menu`)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    const result = await this.menuService.create(createMenuDto);
    return result;
  }

  @Get()
  async findAll(@Query() query: any) {
    const { page = 1, limit = 100 } = query;
    const result = await this.menuService.findAll({
      page: Number(page),
      limit: Number(limit),
    });
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.menuService.findOne(+id);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    const result = await this.menuService.update(+id, updateMenuDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.menuService.remove(+id);
    return result;
  }
}
