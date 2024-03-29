import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import config from 'src/typeOrm.config';
import { UserEntity } from 'src/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwdStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [PassportModule.register({
    defaultStrategy: 'jwt'
  }),

    ConfigModule,

  JwtModule.registerAsync({

    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (ConfigService:ConfigService) => ({
      secret: ConfigService.get('JWT_secreatkey'),
      signOptions: {
        expiresIn: 3600
      }})

  
  }), TypeOrmModule.forFeature([UserEntity, UserRepository])],
controllers: [UserController],
  providers: [UserService, UserRepository, jwdStrategy],
    exports: [jwdStrategy, PassportModule]
})
export class UserModule { }
