import { UserEntity } from "src/user.entity";
import { EntityRepository, Repository } from "typeorm";
@EntityRepository(UserEntity)
export class AuthRepository implements Repository<UserEntity>{

}