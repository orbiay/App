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
    googlelogin(){
        console.log("Auth/google");
    }


    @Get('from-google')
    @UseGuards(AuthGuard('google'))
    async googleloginredirect(@Req() req){
        console.log("Auth/Callback");
        const user = await req.user;
        //user.name = req.user.givenName;
        //console.log(user.name.givenName);
        return await this.authservice.create_Oauth(user);
    }
}
@Controller('auth')
export class fortytwo_Controller{
    constructor(private readonly authservice:AuthService){}
    @Get('42')
    @UseGuards(AuthGuard('42'))
    googlelogin(){
        console.log("Auth/42");
    }


    @Get('from-42')
    @UseGuards(AuthGuard('42'))
    async fortytwo_loginredirect(@Req() req){
        console.log("CallBack");
        const user = await req.user;
        console.log(user);
        return await this.authservice.create_Oauth(user);
    }
}