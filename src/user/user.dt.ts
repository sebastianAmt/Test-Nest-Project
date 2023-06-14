import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UUID } from "crypto";

export class userdto{
   

   
    
    @IsString()
      username: String;

    @IsString()
     password : String;
}