import { Body, Controller, Get, Param, Patch, Post, Query, Render, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigServiceFile } from './config/config.service';
import { Task ,tastStatus} from './location/task.model';
import { v4 as uuid } from 'uuid';
import { UUID } from 'crypto';
import { TaskList } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { getuser } from './user/jwt.decorator';
import { UserEntity } from './user.entity';




interface locationobject {
  location: string[],
  district: string[]
}



@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private ConfigService: ConfigServiceFile) { }


  @Get('/totalTasks')
  @UseGuards(AuthGuard())
  getNewRoute(): Promise<TaskList[]> {
    return this.appService.getTotalTasks();
  }

  @Get(':status?')
  getHello(@Query('status') status?:string): Promise<TaskList[]>{
  console.log(status,"status");
  
  return this.appService.getAllTaksByFiltering(status)
  }

 

  @Patch(':id?')
  updatetask(@Body() updatevalue:any):Promise<void>{

    const {id,status}=updatevalue
   
    return this.appService.updateTask(id,status)
  }

  // @Get('/getLocation')
  // @Render('list.hbs')
  // GetLocation(): locationobject {
  //   return { location: ['location 1', 'location 2', 'location 3'], district: ['Madurai', 'Chennai', 'Trichy'] }
  // }

  @Post('createTask')
  @UseGuards(AuthGuard())
  createTask(@Body() task:TaskList, @Req() user):Promise <TaskList[]>{
    

    
     return this.appService.createTask(task,user.user)

  }
}
