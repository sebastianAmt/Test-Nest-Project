import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { LocationModule } from './location/location.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './trqansform.interseptor';


async function bootstrap() {
  const baseDir= resolve(__dirname,'..')
  const app = await NestFactory.create<NestExpressApplication>(AppModule );
  app.setViewEngine('hbs')
  app.setBaseViewsDir(resolve(baseDir,'views'))
  app.useStaticAssets(resolve(baseDir,'public'))
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
