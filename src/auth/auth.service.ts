import { Injectable, Res } from '@nestjs/common';
import { promises } from 'dns';
import { Response } from 'express';
import { UserDto, jwtDTO } from 'src/user/use.Dto';
import { User } from 'src/user/user.entities';
import { UserService } from 'src/user/user.service';
import { JWToken } from './jwt.service';


@Injectable()
export class AuthService {
    constructor(private readonly userservice:UserService,private readonly jwtoken:JWToken){}
    singin(@Res() res:Response){
        res.sendFile('/app/views/login.html');
    }
    singup(@Res() res:Response){
        res.sendFile('/app/views/signup.html');
    }
    async check_and_create(body:UserDto):Promise<boolean>{

        if (body.password == body.confirmpassword)
        {
            if (await this.userservice.findByemail(body.email) == null)
            {
                await this.userservice.save(body);
                return true;
            }
            else 
                return false;
        }
        else
            return false;
    }
    async validate_by_email(email:String,password:String) :Promise<User | null>
    {
        const user = await this.userservice.findByemail(email);
        if (user && password == user.password && user.password && user.password != 'Oauth' )
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
    async create_Oauth(body:UserDto):Promise<boolean>
    {
       const user = await this.userservice.findByemail(body.email);
       if (!user)
       {
            await this.userservice.save(body);
            return true;
       }
        else
            return false;
    }
    async generatOken(user:jwtDTO){
        return await this.jwtoken.generateToken(user);
    }
    async isValid(token:String)
    {
        return await this.jwtoken.verify(token);
    }
}
