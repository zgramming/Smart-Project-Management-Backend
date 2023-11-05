import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from 'src/utils/constant';

@Injectable()
export class ValidateJWTGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        error: true,
        message: 'Token is required',
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      // Sub is user id
      request['user'] = payload;

      return true;
    } catch (error) {
      let message = 'Token is invalid';

      if (error.name === 'TokenExpiredError') {
        message = 'Token is expired';
      }

      throw new UnauthorizedException({
        error: true,
        message: message,
        detail: error,
        stacktrace: error.stack,
      });
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
