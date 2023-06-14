import { UserEntity } from "src/user.entity";
import {  EntityRepository, Repository } from "typeorm";
import { userdto } from "./user.dt";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { jwtpoayload } from "./jwtpayloaad.dt";


@Injectable()

export class UserRepository {
   
    constructor(private jwtService:JwtService){}
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>;

    async createuser(usercredentials:userdto):Promise<void>{

        console.log("comin here in repo",usercredentials);
        const {username,password}=usercredentials
        const salt= await bcrypt.genSalt();
        const hassedpwd= await bcrypt.hash(password,salt)
        console.log(hassedpwd);
        
        
        const val=await this.repository.save(this.repository.create({username,password:hassedpwd}))
        
        // console.log(val);
        
     return 
    }

    async login(usercredentials:userdto):Promise<{accesstoken:string}>{
        const {username,password}=usercredentials
        console.log(typeof(username),"username");
        const val= this.repository.createQueryBuilder('UserEntity').andWhere('UserEntity.username LIKE :username',{username:`%${username}%`})
        const result=await val.getOne()
        console.log(result,"result");
        if(result){
            if(await bcrypt.compare(password,result.password)){

                const payload:jwtpoayload={ username }
                const accesstoken= this.jwtService.sign(payload)
                console.log(accesstoken,"accesstoken");
                
                
                return {accesstoken}
            }
            else{
                throw new UnauthorizedException('You password credentials is invalid')
            }
        }
        
        
     
    }
}