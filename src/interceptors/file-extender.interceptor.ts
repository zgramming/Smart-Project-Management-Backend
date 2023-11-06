import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FileExtender implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    // Inject body to request
    req.body = {
      ...req.body,
      ...req.query,
      ...req.params,
    };

    console.log({ body: req.body });

    return next.handle();
  }
}
