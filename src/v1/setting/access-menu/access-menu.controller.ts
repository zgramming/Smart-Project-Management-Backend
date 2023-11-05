import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AccessMenuService } from './access-menu.service';
import { CreateAccessMenuDto } from './dto/create-access-menu.dto';
import { prefixSettingUrl } from 'src/utils/constant';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';

@UseGuards(ValidateJWTGuard)
@Controller(`${prefixSettingUrl}/access-menu`)
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

  @Get('role/:roleId')
  findByRoleId(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.accessMenuService.findByRoleId(+roleId);
  }
}
