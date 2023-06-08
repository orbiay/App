import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/use.Dto';
import { LocalStrategy } from './local.startegy';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { TokenGuard } from './guards';
import { error } from 'console';



@Controller('auth')
export class AuthController {
    constructor(private readonly authservice:AuthService,private readonly localStrategy:LocalStrategy){}
    @Get('signin')
   // @UseGuards(TokenGuard)
    singin(@Res() res:Response){
        this.authservice.singin(res);
    }
    @Get('signup')
    //@UseGuards(TokenGuard)
    singup(@Res() res:Response){
        this.authservice.singup(res);
    }
    @Post('signup')
    async create(@Body() Body:UserDto,@Res() res:Response){
        if(await this.authservice.check_and_create(Body)  != null)
        {
            res.sendFile('/app/views/login.html');
        }
        else
            return {
                user:Body,
                message:'something wrong with email or password',
            }
    }
    @Post('login')
    async checking(@Body() Body:UserDto,@Res() res:Response){

        const user = await this.localStrategy.validate(Body.email,Body.password);
        if (!user)
        {
            var obj:Object = {
                token:'error',
                user:Body,
                message:'something wrong with email or password'
            }
            res.send(obj);
            return obj;
        }
        else 
        {
            const jwtoken = await this.authservice.generatOken(Body);
             var obj:Object  = {
                token:jwtoken,
                user:Body,
                message:'the user entrance secssufully'
            }
            res.send(obj);
            return obj;
        }
    }
}
@Controller('auth')
export class googleController{
    constructor(private readonly authservice:AuthService){}
    @UseGuards(AuthGuard('google'))
    //@UseGuards(TokenGuard)
    @Get('google')
    googlelogin(){
        console.log("Auth/google");
    }

    @UseGuards(AuthGuard('google'))
    @Get('from-google')
    async googleloginredirect(@Req() req, @Res() res:Response){
        console.log("CallBack");
        const user = await req.user;
        console.log(user);
        if (await this.authservice.create_Oauth(user) == true)
        {
            const cookie_token = await this.authservice.generatOken(user);
            res.cookie('jwt', cookie_token, {
                httpOnly: true,
              });
            res.setHeader('Authorization', `Bearer ${cookie_token}`);
            res.sendFile('/app/views/home.html');
            console.log('coockie token = '+ cookie_token);
            return {
                token : cookie_token,
                user:user,
                message:'the user create secssufully',
            }
        }
        else{
            console.log('error');
            const cookie_token = await this.authservice.generatOken(user);
            console.log('create token2');
            res.cookie('jwt', cookie_token, {
                httpOnly: true,
            });
            console.log('coockie token = '+ cookie_token);
            res.setHeader('Authorization', `Bearer ${cookie_token}`);
            res.sendFile('/app/views/home.html');
            return{
                token: cookie_token,
                user:user,
                message:'the email already exist'
            } 
        }
    }
}

@Controller('auth')
export class fortytwo_Controller{
    constructor(private readonly authservice:AuthService){}
    @Get('42')
    @UseGuards(AuthGuard('42'))
    // @UseGuards(TokenGuard)
    googlelogin(@Req() req,@Res() res){}


    @Get('from-42')
    @UseGuards(AuthGuard('42'))
    async fortytwo_loginredirect(@Req() req, @Res() res:Response ){
        console.log("CallBack");
        const user = await req.user;
        if (await this.authservice.create_Oauth(user) == true)
        {
            const cookie_token = await this.authservice.generatOken(user);
            res.setHeader('Authorization', `Bearer ${cookie_token}`);
            console.log('coockie token = '+ cookie_token);
            res.sendFile('/app/views/home.html');

            return {
                token : cookie_token,
                user:user,
                message:'the user create secssufully',
            }
        }
        else{
            console.log('error');
            const cookie_token = await this.authservice.generatOken(user);
            console.log('create token2');
            res.cookie('Access Token', cookie_token, {
                httpOnly: true,
              });
            console.log('coockie token = '+ cookie_token);
            res.setHeader('Authorization', `Bearer ${cookie_token}`);
            res.sendFile('/app/views/home.html');
            return{
                token: cookie_token,
                user:user,
                message:'the email already exist'
            } 
        }
    }
}