import { UUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskList } from "./task.entity";
@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id:UUID;
    
    @Column()
    username: String;

    @Column()
    password : String;

    @OneToMany((type)=>TaskList,(task)=>task.user,{eager:true})
    task:TaskList[]

}