import { Injectable, Logger, Query } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { Task } from './location/task.model';
import { UUID } from 'crypto';
import { PassThrough } from 'stream';
import { throws } from 'assert';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from './task.entity';
import { UserEntity } from './user.entity';






@Injectable()
export class AppService {

  private logger=new Logger('AppService')
  constructor(

    
    @InjectRepository(TaskList)
    private repository:Repository<TaskList>){}

  getTaks(): any {
    throw new Error('Method not implemented.');
  }

  
  async getTotalTasks(user): Promise<TaskList[]> {
    const query=this.repository.createQueryBuilder('TaskList')
    query.where({user})
    const tasksListValues= await query.getMany()  
    return tasksListValues
  }

  private Task = []

  getHello(): Task[] {
       return this.Task
  }

 async updateTask(id,status):Promise<any>{
    console.log(id,"id");
    
    if(!id){
      this.logger.error(`Id not found ${id}`)
      throw  new NotFoundException('not found id')
      
    }
    if(id){
      const updatedValue=await this.repository.update({id},{status})
      return updatedValue.affected
    
    }


  }

  async getAllTaksByFiltering(id: UUID,user):Promise<TaskList>{
      console.log(user,"user");
      const FullQuery=this.repository.createQueryBuilder('TaskList')
      FullQuery.andWhere({'user':user})
      FullQuery.andWhere({'id':id})
      const result=await FullQuery.getOne()
      console.log(result,"result");

      if(!result){
        throw new NotFoundException(`Task with ID ${id} not found`)
      }
      
      return result
      
  }

  async createTask(values:TaskList,user:UserEntity) :Promise<TaskList[]>{
  
   const{ name,description,status}=values
   const userval={
     name,
     description,
     status,
     user
   }

  console.log(userval,"loggvalues");
  
   const inservalue=await this.repository.create(userval)
   const result=await this.repository.save(inservalue)
   return [result]
  }


}
