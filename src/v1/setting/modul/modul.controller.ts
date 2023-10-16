import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulService } from './modul.service';
import { CreateModulDto } from './dto/create-modul.dto';
import { UpdateModulDto } from './dto/update-modul.dto';

@Controller('modul')
export class ModulController {
  constructor(private readonly modulService: ModulService) {}

  @Post()
  create(@Body() createModulDto: CreateModulDto) {
    return this.modulService.create(createModulDto);
  }

  @Get()
  findAll() {
    return this.modulService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModulDto: UpdateModulDto) {
    return this.modulService.update(+id, updateModulDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulService.remove(+id);
  }
}
