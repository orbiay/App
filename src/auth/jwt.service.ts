import { Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import {jwtDTO } from 'src/user/use.Dto';
import { User } from 'src/user/user.entities';

@Injectable()
export class JWToken{
  constructor(private readonly jwtService: JwtService) {}

    private secret_key:String = 'k9vL9fr02UHQm1I7C5sO8bjdMnG3FpWz';
    async generateToken(user:jwtDTO){
        return  this.jwtService.sign(user);
    }
    async verify(token):Promise<boolean>
    {
        try 
        {
          if (token)
          {
            
            const decoded = await this.jwtService.verifyAsync(token, {secret:this.secret_key.toString()});
            console.log('Decoded:', decoded);
            const currentTime = Math.floor(Date.now() / 1000);
            
            if (decoded.exp > currentTime) {
              console.log('EHO EHO');
              return true; // Token is valid and has not expired
            } else {
              return false; // Token has expired
            }
          }
          else 
            return false;
        } 
        catch (error) {
          console.log('4');
          return false; // Token is invalid
        }
    }
    async decoded (token):Promise<null|User>{
      try 
        {
          if (token)
          {
            const user = await this.jwtService.verifyAsync(token, {secret:this.secret_key.toString()});
            console.log('Decoded:', user);
            return user;
          }
          else 
            return null;
        } 
        catch (error) {
          console.log('4---------------->>>>');
          return null; // Token is invalid
        }
    }
}