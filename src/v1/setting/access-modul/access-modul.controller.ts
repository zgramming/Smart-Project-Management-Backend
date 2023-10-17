import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AccessModulService } from './access-modul.service';
import { CreateAccessModulDto } from './dto/create-access-modul.dto';
import { prefixSettingUrl } from 'src/utils/constant';

@Controller(`${prefixSettingUrl}/access-modul`)
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

  @Get('role/:roleId')
  findByRole(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.accessModulService.findByRoleId(roleId);
  }
}
