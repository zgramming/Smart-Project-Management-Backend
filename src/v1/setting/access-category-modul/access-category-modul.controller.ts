import { Controller, Post, Body, Get } from '@nestjs/common';
import { AccessCategoryModulService } from './access-category-modul.service';
import { CreateAccessCategoryModulDto } from './dto/create-access-category-modul.dto';
import { prefixSettingUrl } from 'src/utils/constant';

@Controller(`${prefixSettingUrl}/access-category-modul`)
export class AccessCategoryModulController {
  constructor(
    private readonly accessCategoryModulService: AccessCategoryModulService,
  ) {}

  @Post()
  create(@Body() createAccessCategoryModulDto: CreateAccessCategoryModulDto) {
    return this.accessCategoryModulService.create(createAccessCategoryModulDto);
  }

  @Get('role/:roleId')
  findByRoleId(@Body() roleId: number) {
    return this.accessCategoryModulService.findByRoleId(roleId);
  }
}
