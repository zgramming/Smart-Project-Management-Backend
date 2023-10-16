import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessModulService } from './access-modul.service';
import { CreateAccessModulDto } from './dto/create-access-modul.dto';
import { UpdateAccessModulDto } from './dto/update-access-modul.dto';

@Controller('access-modul')
export class AccessModulController {
  constructor(private readonly accessModulService: AccessModulService) {}

  @Post()
  create(@Body() createAccessModulDto: CreateAccessModulDto) {
    return this.accessModulService.create(createAccessModulDto);
  }

  @Get()
  findAll() {
    return this.accessModulService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessModulService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessModulDto: UpdateAccessModulDto) {
    return this.accessModulService.update(+id, updateAccessModulDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessModulService.remove(+id);
  }
}
