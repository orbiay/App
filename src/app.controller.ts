import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response ,Request} from 'express';
import { TokenGuard } from './auth/guards';

@Controller()
export class AppController {

  @Get()
  @UseGuards(TokenGuard)
  default(@Res() res:Response,@Req() req:Request){
    const user = (req as any).user;
    console.log(user);
    if (user.status == 'unauthorized')
        res.sendFile('/app/views/index.html');
    if(user.status == 'authorized')
        res.sendFile('/app/views/home.html');
    return user;
  }
}
