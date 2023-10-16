import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MasterDataService } from './master-data.service';
import { CreateMasterDatumDto } from './dto/create-master-datum.dto';
import { UpdateMasterDatumDto } from './dto/update-master-datum.dto';

@Controller('master-data')
export class MasterDataController {
  constructor(private readonly masterDataService: MasterDataService) {}

  @Post()
  create(@Body() createMasterDatumDto: CreateMasterDatumDto) {
    return this.masterDataService.create(createMasterDatumDto);
  }

  @Get()
  findAll() {
    return this.masterDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterDatumDto: UpdateMasterDatumDto) {
    return this.masterDataService.update(+id, updateMasterDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterDataService.remove(+id);
  }
}
