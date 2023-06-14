import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ConfigServiceFile } from './config.service';


@Module({imports: [
    
  ],
providers:[ConfigServiceFile]})
export class ConfigModule {}
