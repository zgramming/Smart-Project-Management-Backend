import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ParameterService } from './parameter.service';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { UpdateParameterDto } from './dto/update-parameter.dto';
import { prefixSettingUrl } from 'src/utils/constant';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';

@UseGuards(ValidateJWTGuard)
@Controller(`${prefixSettingUrl}/parameter`)
export class ParameterController {
  constructor(private readonly parameterService: ParameterService) {}

  @Post()
  create(@Body() createParameterDto: CreateParameterDto) {
    return this.parameterService.create(createParameterDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const { limit = 100, page = 1, name } = query;
    return this.parameterService.findAll({
      limit: Number(limit),
      page: Number(page),
      name,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parameterService.findOne(+id);
  }

  @Get('code/:code')
  findByCode(@Param('code') code: string) {
    return this.parameterService.findByCode(code);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParameterDto: UpdateParameterDto,
  ) {
    return this.parameterService.update(+id, updateParameterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parameterService.remove(+id);
  }
}
