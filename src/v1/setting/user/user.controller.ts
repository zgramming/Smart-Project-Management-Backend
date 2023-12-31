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
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prefixSettingUrl } from 'src/utils/constant';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';
import { UserPayloadJWT } from 'src/interface/user_payload_jwt.interface';

@UseGuards(ValidateJWTGuard)
@Controller(`${prefixSettingUrl}/user`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return result;
  }

  @Get()
  async findAll(@Query() queryParams: any) {
    const { page, limit } = queryParams;
    const result = await this.userService.findAll({
      page: page ? +page : undefined,
      limit: limit ? +limit : undefined,
    });
    return result;
  }

  @Get('me')
  async findMe(@Req() { userPayloadJWT }: { userPayloadJWT: UserPayloadJWT }) {
    const { sub } = userPayloadJWT;
    const result = await this.userService.findOne(sub);
    return result;
  }

  @Get('by-role/developer-and-project-manager')
  async findOnlyDeveloperAndProyekManager() {
    const result = await this.userService.findOnlyDeveloperAndProyekManager();
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.userService.findOne(+id);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.userService.update(+id, updateUserDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.userService.remove(+id);
    return result;
  }
}
