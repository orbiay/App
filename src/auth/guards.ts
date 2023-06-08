import { CanActivate, ExecutionContext, Injectable, Res } from "@nestjs/common";
import { JWToken } from "./jwt.service";
import { Response } from 'express';

// @Injectable()
// export class TokenGuard implements CanActivate
// {
//     constructor(private readonly jwtOken:JWToken){}
//     canActivate(context: ExecutionContext): boolean {
//         const req:Request = context.switchToHttp().getRequest();
//         const res:Response = context.switchToHttp().getResponse();
//         //console.log(JSON.stringify(req.headers))
//         const headers = JSON.parse(JSON.stringify(req.headers));
//         console.log(headers.cookie['Access Token']);
//         if ( headers.cookie['Access Token'] && this.jwtOken.verify(headers.cookie['Access Token']))
//         {
//             console.log('token = '+ headers.cookie['Access Token']);
//             console.log('doesn\'t expired');
//             //res.sendFile('/app/views/login.html');
//             return true;
//         }
//         if (!headers.cookie['Access Token'])
//         {
//             console.log('!headers.cookie[\'Access Token\']');
//             res.sendFile('/app/views/login.html')
//             return false;
//         }
//         console.log('token is expired');
//         res.sendFile('/app/views/login.html')
//         return false
//     }
// }
interface CustomRequest extends Request {
  user?: any;
}
@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly jwtToken: JWToken) {}

  async canActivate(context: ExecutionContext):Promise< boolean> {
    const req = context.switchToHttp().getRequest<CustomRequest>();
    const res = context.switchToHttp().getResponse<Response>();
    const authorizationHeader = req.headers['authorization'];
    if (authorizationHeader && await authorizationHeader.startsWith('Bearer ')) {
      const token = await authorizationHeader.substring(7); // Extract the token from the "Bearer " prefix
      console.log('token = ' + token);
      
      if (await this.jwtToken.verify(token)) {
        console.log('Token is valid');
        //Object.defineProperty(req, 'user', { value: { status: 'authorized', message:'token valid' } });
        req.user = { status: 'authorized', message: 'token valid' };
        return true;
      }
    }

    console.log('Invalid or expired token');
    //res.sendFile('/app/views/login.html');
    console.log('im HERE ')
    req.user = { status: 'unauthorized', message: 'token isn\'t valid' };
    return true;
  }
}