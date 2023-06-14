import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { ConfigModule } from './config/config.module';
import { ConfigServiceFile } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeOrm.config';
import { TaskList } from './task.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [LocationModule, UserModule,ConfigModule,TypeOrmModule.forRoot(config),TypeOrmModule.forFeature([TaskList]), AuthModule, UserModule, ],
  controllers: [AppController],
  providers: [AppService,ConfigServiceFile],
})
export class AppModule {}
