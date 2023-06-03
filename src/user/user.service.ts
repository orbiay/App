import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entities';
import { UserDto} from './use.Dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}
    async save(Body:UserDto){
        await this.userRepo.save(Body);
    }
    async findByemail(email:any): Promise<User>
    {
       const user =  await this.userRepo.findOne({where :{ email: email}});
       return user;
    }
}
