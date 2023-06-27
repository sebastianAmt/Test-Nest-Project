import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { LocationModule } from './location/location.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './trqansform.interseptor';
import { Logger } from '@nestjs/common';



async function bootstrap() {
  const logger=new Logger()
  const baseDir= resolve(__dirname,'..')
  const app = await NestFactory.create<NestExpressApplication>(AppModule );
  app.setViewEngine('hbs')
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(4000);
}
bootstrap();
