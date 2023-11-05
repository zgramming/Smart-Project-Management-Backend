import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
    }),
  );

  await app.listen(PORT || 4000);
}
bootstrap();
