import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { prefixUrl } from 'src/utils/constant';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller(`${prefixUrl}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginAuthDto) {
    return this.authService.login(body);
  }
}
