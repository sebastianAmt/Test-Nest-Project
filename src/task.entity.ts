import { UUID } from "crypto"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from "./user.entity";
import { Exclude } from "class-transformer";


@Entity()
export class TaskList{

    @PrimaryGeneratedColumn('uuid')
    id:UUID;

    @Column()
    name:string
  
    @Column()
    description:string;

    @Column()
    status:string;
        
    @ManyToOne((type)=>UserEntity,(user)=>user.task,{eager:false})
    @Exclude({toPlainOnly:true})
    user:UserEntity
   
}