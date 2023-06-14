import { IsString, IsEmail ,IsDate, IsEnum} from 'class-validator';
import { UUID } from 'crypto';



export enum tastStatus{
    done='done',
    todo='todo'
}

export class Task{
    
    id:UUID;

    @IsString()
    name:string;

    
    description:string;


    @IsEnum(tastStatus)
    status:tastStatus;
    
  
}