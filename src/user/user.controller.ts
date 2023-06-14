import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { userdto } from './user.dt';
import { UserEntity } from 'src/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('/createcredentials')
    createCredentials(@Body() credentials: userdto): Promise<void> {
        return this.userService.createService(credentials)

    }

    @Post('/login')
    login(@Body() credentials: userdto): Promise<{ accesstoken: string }> {
        return this.userService.login(credentials)

    }

    @Post('test')
    @UseGuards(AuthGuard())
    tesfun(@Req() req) {
        console.log(req, "request");

    }
}
