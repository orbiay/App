import { Injectable, Res } from '@nestjs/common';
import { promises } from 'dns';
import { Response } from 'express';
import { UserDtosingup } from 'src/user/use.Dto';
import { User } from 'src/user/user.entities';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
    constructor(private readonly userservice:UserService){}
    singin(@Res() res:Response){
        res.sendFile('/app/views/login.html');
    }
    singup(@Res() res:Response){
        res.sendFile('/app/views/signup.html');
    }
    async check_and_create(body:UserDtosingup){

        if (body.password == body.confirmpassword)
        {
            if (await this.userservice.findByemail(body.email) == null)
            {
                await this.userservice.save(body);
                return 1;
            }
            else 
                return null;
        }
        else
            return null;
    }
    async validate_by_email(email:String,password:String) :Promise<User | null>
    {
        const user = await this.userservice.findByemail(email);
        if (user && password == user.password)
        {
            console.log(user);
            return user;
        }
        else 
        {
            console.log(user);
            return null;
        }
    }
}
