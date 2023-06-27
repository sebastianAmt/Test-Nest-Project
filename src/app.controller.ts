import { Body, Controller, Get, Param, Patch, Post, Query, Render, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { TaskList } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

interface locationobject {
  location: string[],
  district: string[]
}

@Controller()
export class AppController {
  private logger=new Logger('AppController');
  constructor(private readonly appService: AppService,
    private confidService:ConfigService
  
    ) { 
      console.log(confidService.get('DB_PORT'),"port");
      
    }


  //find total tasks
  @Get('/totalTasks')
  @UseGuards(AuthGuard())
  getNewRoute(@Req() user): Promise<TaskList[]> {
    this.logger.verbose(`"${JSON.stringify(user.user.username)}" is asked total tasks`)
    return this.appService.getTotalTasks(user.user);
  }

  //filter by id
  @Get('/findBy/:id?')
  @UseGuards(AuthGuard())
  getResultsbyid(@Req() user,@Query('id') id): Promise<TaskList>{
   return this.appService.getAllTaksByFiltering(id,user.user)
  }

  //update the status by id
  @Patch(':id?')
  @UseGuards(AuthGuard())
  updatetask(@Body() updatevalue:any,@Req() user):Promise<void>{
    console.log(user.user,"user data");
    
    const {id,status}=updatevalue
       return this.appService.updateTask(id,status)
  }

  //create tasks
  @Post('createTask')
  @UseGuards(AuthGuard())
  createTask(@Body() task:TaskList, @Req() user):Promise <TaskList[]>{
    return this.appService.createTask(task,user)
  }
}
