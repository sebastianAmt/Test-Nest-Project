import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user.entity';
import { userdto } from './user.dt';

@Injectable()
export class UserService {
    
    constructor( private readonly userRepository:UserRepository){

    }

    async createService(usercredentials:userdto):Promise<void>{
        console.log("yes it is comig in services");
        return await this.userRepository.createuser(usercredentials)
    }

    async login(usercredentials:userdto):Promise<{accesstoken:string}>{
        return await this.userRepository.login(usercredentials)
    }
}
