import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/use.Dto';
import { LocalStrategy } from './local.startegy';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

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
    async create(@Body() Body:UserDto,@Res() res:Response){
        if(await this.authservice.check_and_create(Body)  != null)
            res.sendFile('/app/views/login.html');
        else
            this.authservice.singup(res);
    }
    @Post('login')
    async checking(@Body() Body:UserDto,@Res() res:Response){

        const user = await this.localStrategy.validate(Body.email,Body.password);
        if (!user)
            res.sendFile('/app/views/login.html');
        else 
            res.sendFile('/app/views/home.html');
    }
}
@Controller('auth')
export class googleController{
    constructor(private readonly authservice:AuthService){}
    @Get('google')
    @UseGuards(AuthGuard('google'))
    googlelogin(){}


    @Get('from-google')
    @UseGuards(AuthGuard('google'))
    async googleloginredirect(@Req() req){
        const user = await req.user;
        return await this.authservice.create_Oauth(user);
    }
}