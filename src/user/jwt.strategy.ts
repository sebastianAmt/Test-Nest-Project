import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { sign } from "crypto";
import { jwtpoayload } from "./jwtpayloaad.dt";
import { UserEntity } from "src/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class jwdStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(UserRepository)
        private userrepository:UserRepository){
            super({
                secretOrKey:'secreat001',
                jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
            });
        }

        @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>;

        async validate(payload:jwtpoayload):Promise<UserEntity>{
            const {username}=payload
            const uservalidate=await this.repository.createQueryBuilder('UserEntity').andWhere('UserEntity.username LIKE :username',{username:`%${username}%`})
            const result=await uservalidate.getOne()
            console.log(result,"result");
           if(!result){
                throw new UnauthorizedException('this use is bnot valid')
            }
            return result
        }
}