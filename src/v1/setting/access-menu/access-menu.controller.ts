import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessMenuService } from './access-menu.service';
import { CreateAccessMenuDto } from './dto/create-access-menu.dto';
import { UpdateAccessMenuDto } from './dto/update-access-menu.dto';

@Controller('access-menu')
export class AccessMenuController {
  constructor(private readonly accessMenuService: AccessMenuService) {}

  @Post()
  create(@Body() createAccessMenuDto: CreateAccessMenuDto) {
    return this.accessMenuService.create(createAccessMenuDto);
  }

  @Get()
  findAll() {
    return this.accessMenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessMenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessMenuDto: UpdateAccessMenuDto) {
    return this.accessMenuService.update(+id, updateAccessMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessMenuService.remove(+id);
  }
}
