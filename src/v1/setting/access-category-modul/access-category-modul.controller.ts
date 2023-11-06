import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AccessCategoryModulService } from './access-category-modul.service';
import { CreateAccessCategoryModulDto } from './dto/create-access-category-modul.dto';
import { prefixSettingUrl } from 'src/utils/constant';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';
import { UserPayloadJWT } from 'src/interface/user_payload_jwt.interface';

@UseGuards(ValidateJWTGuard)
@Controller(`${prefixSettingUrl}/access-category-modul`)
export class AccessCategoryModulController {
  constructor(
    private readonly accessCategoryModulService: AccessCategoryModulService,
  ) {}

  @Post()
  create(@Body() createAccessCategoryModulDto: CreateAccessCategoryModulDto) {
    return this.accessCategoryModulService.create(createAccessCategoryModulDto);
  }

  @Get('role')
  findByRoleId(@Req() req: any) {
    const {
      userPayloadJWT,
    }: {
      userPayloadJWT: UserPayloadJWT;
    } = req;

    return this.accessCategoryModulService.findByRoleId(userPayloadJWT.roleId);
  }
}
