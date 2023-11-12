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
import { ModulService } from './modul.service';
import { CreateModulDto } from './dto/create-modul.dto';
import { UpdateModulDto } from './dto/update-modul.dto';
import { prefixSettingUrl } from 'src/utils/constant';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';

@UseGuards(ValidateJWTGuard)
@Controller(`${prefixSettingUrl}/modul`)
export class ModulController {
  constructor(private readonly modulService: ModulService) {}

  @Post()
  async create(@Body() createModulDto: CreateModulDto) {
    return this.modulService.create(createModulDto);
  }

  @Get()
  async findAll(@Query() query: any) {
    const { page = 1, limit = 100, name } = query;
    return this.modulService.findAll({
      page: Number(page),
      limit: Number(limit),
      name,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.modulService.findOne(+id);
  }

  @Get('code/:code')
  async findByCode(@Param('code') code: string) {
    return this.modulService.findByCode(code);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModulDto: UpdateModulDto,
  ) {
    return this.modulService.update(+id, updateModulDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.modulService.remove(+id);
  }
}
