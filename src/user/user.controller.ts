import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { userdto } from './user.dt';
import { UserEntity } from 'src/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    //create credentials 
    @Post('/createcredentials')
    createCredentials(@Body() credentials: userdto): Promise<void> {
        return this.userService.createService(credentials)

    }

    //it isses access token
    @Post('/login')
    login(@Body() credentials: userdto): Promise<{ accesstoken: string }> {
        return this.userService.login(credentials)

    }

   
}
