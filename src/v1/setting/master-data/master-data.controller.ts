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
import { MasterDataService } from './master-data.service';
import { CreateMasterDatumDto } from './dto/create-master-datum.dto';
import { UpdateMasterDatumDto } from './dto/update-master-datum.dto';
import { prefixSettingUrl } from 'src/utils/constant';

@Controller(`${prefixSettingUrl}/master-data`)
export class MasterDataController {
  constructor(private readonly masterDataService: MasterDataService) {}

  @Post()
  create(@Body() createMasterDatumDto: CreateMasterDatumDto) {
    return this.masterDataService.create(createMasterDatumDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const { limit = 100, page = 1 } = query;
    return this.masterDataService.findAll({
      limit: Number(limit),
      page: Number(page),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterDataService.findOne(+id);
  }

  @Get('master-category/code/:code')
  findByMasterCategoryCode(@Param('code') code: string) {
    return this.masterDataService.findByMasterCategoryCode(code);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMasterDatumDto: UpdateMasterDatumDto,
  ) {
    return this.masterDataService.update(+id, updateMasterDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterDataService.remove(+id);
  }
}
