import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { comparePassword, handlingCustomError } from 'src/utils/function';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(body: LoginAuthDto) {
    try {
      const userByUsername = await this.prisma.user.findUnique({
        where: {
          username: body.username,
        },
      });

      if (!userByUsername) {
        throw new NotFoundException({
          error: false,
          message: `Username ${body.username} not found`,
        });
      }

      const isPasswordMatch = await comparePassword(
        body.password,
        userByUsername.password,
      );

      if (!isPasswordMatch) {
        throw new ForbiddenException({
          error: false,
          message: 'Password is wrong',
        });
      }

      // Sub is user id
      const payload = {
        username: userByUsername.username,
        sub: userByUsername.id,
      };

      const token = await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      });

      return {
        error: false,
        message: 'Login success',
        data: {
          token,
        },
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
