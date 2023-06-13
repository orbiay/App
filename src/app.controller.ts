import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response ,Request} from 'express';
import { TokenGuard } from './auth/guards';
import { UserService } from './user/user.service';
import { UserDto } from './user/use.Dto';
import { JWToken } from './auth/jwt.service';


@Controller()
export class AppController {
  constructor(private readonly userservice:UserService,private readonly jwt:JWToken){}
  @Get()
  @UseGuards(TokenGuard)
  async default(@Res() res:Response,@Req() req:Request,@Query() query: UserDto){
    const status = (req as any).user;
    console.log(status);
    if (status.status == 'unauthorized')
        res.sendFile('/app/views/index.html');
    if(status.status == 'authorized')
    {
        console.log(query.image);
        //return req.body;
        const decoded = await this.jwt.decoded(status.token);
        const user = await this.userservice.findByemail((decoded).email);
        //user.username = JSON.stringify(user.username);
        console.log('user == '+ JSON.stringify(user));
        res.render('profile',{user});
    }
    return status;
  }
}
