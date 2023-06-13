import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as ejs from 'ejs';
import { join } from 'path';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create< NestExpressApplication>(AppModule);
  await app.listen(3000);
  app.useStaticAssets(join(__dirname, '..', 'views'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
}
bootstrap();
