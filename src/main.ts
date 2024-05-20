import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  app.enableCors();
  app.setGlobalPrefix('api');

  app.useLogger(logger);

  try {
    await app.listen(3333);
    logger.log('Application is running on: http://localhost:3333');
  } catch (err) {
    logger.error('Error starting application', err);
  }
}

bootstrap();
