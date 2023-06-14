import { Injectable } from '@nestjs/common';
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

  constructor(
    @InjectRepository(TaskList)
    private repository:Repository<TaskList>){}

  getTaks(): any {
    throw new Error('Method not implemented.');
  }

  
  async getTotalTasks(): Promise<TaskList[]> {
    const tasksListValues=await this.repository.find()
    console.log(tasksListValues,"tasksListValues");
    
    return [tasksListValues[0]]
  }

  private Task = []

  getHello(): Task[] {
       return this.Task
  }

 async updateTask(id,status):Promise<any>{
    console.log("coming2");
    if(!id){
      throw  new NotFoundException('not found id')
      
    }
    if(id){
      const updatedValue=await this.repository.update({id},{status})
      return updatedValue.affected
    
    }


  }

  async getAllTaksByFiltering(status: string):Promise<TaskList[]>{
   console.log(status,"status");
   
      const FullQuery=this.repository.createQueryBuilder('TaskList')
      FullQuery.andWhere('LOWER(TaskList.status)LIKE LOWER(:status)',{status:`%${status}%`}
        )
      const result=await FullQuery.getMany()
      console.log(result,"result");
      
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
