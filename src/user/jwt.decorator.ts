import { createParamDecorator,ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { error } from "console";
import { UserEntity } from "src/user.entity";


export const getuser=createParamDecorator((_data,cxt:ExecutionContext):UserEntity =>{
    const req=cxt.switchToHttp().getRequest();
    if(!req){
        throw new UnauthorizedException('you are not user')
    }
    console.log(req,"user");
    console.log(req.user,"user");
    
    return req.user;

})