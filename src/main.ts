import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { whitelistUrl } from './utils/constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  const APP_ENV = configService.get('APP_ENV');
  const isProduction = APP_ENV === 'production';

  if (isProduction) {
    app.enableCors({
      credentials: true,
      origin: whitelistUrl,
      allowedHeaders: '*',
      methods: '*',
    });
  } else {
    app.enableCors();
  }

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
    }),
  );

  await app.listen(PORT || 4000);
}
bootstrap();
