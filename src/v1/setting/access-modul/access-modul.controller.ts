import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AccessModulService } from './access-modul.service';
import { CreateAccessModulDto } from './dto/create-access-modul.dto';
import { prefixSettingUrl } from 'src/utils/constant';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';

@UseGuards(ValidateJWTGuard)
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

  @Get('role/:roleId/selected-unselected-access')
  findSelectedUnselectedAccess(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.accessModulService.findSelectedAndUnselectedAccessByRole(
      roleId,
    );
  }

  @Get('role/:roleId')
  findByRole(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.accessModulService.findByRoleId(roleId);
  }
}
