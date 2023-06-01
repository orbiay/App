import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDtosingin, UserDtosingup } from 'src/user/use.Dto';
import { LocalStrategy } from './local.startegy';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice:AuthService,private readonly localStrategy:LocalStrategy){}
    @Get('signin')
    singin(@Res() res:Response){
        this.authservice.singin(res);
    }
    @Get('signup')
    singup(@Res() res:Response){
        this.authservice.singup(res);
    }
    @Post('signup')
    async create(@Body() Body:UserDtosingup,@Res() res:Response){
        if(await this.authservice.check_and_create(Body)  != null)
            res.sendFile('/app/views/login.html');
        else
            this.authservice.singup(res);
    }
    @Post('login')
    async checking(@Body() Body:UserDtosingin,@Res() res:Response){

        const user = await this.localStrategy.validate(Body.email,Body.password);
        if (!user)
            res.sendFile('/app/views/login.html');
        else 
            res.sendFile('/app/views/home.html');
    }
}
