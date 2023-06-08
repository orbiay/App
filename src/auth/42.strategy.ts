import { Injectable } from "@nestjs/common";
import {  PassportStrategy } from "@nestjs/passport";
import { Strategy ,Profile} from 'passport-42';
@Injectable()
export class fortytwo_Strategy extends PassportStrategy(Strategy,'42'){
    constructor(){
        super({
            clientID:'u-s4t2ud-97201b0b9664120cef3e2130f4f15b0f1993c65c776a8593967c46214ef534d6',
            clientSecret:'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',
            callbackURL:'http://localhost:3000/auth/from-42',
        })
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
        // Access the tokens
        //console.log('Access Token:', accessToken);
        //console.log('Refresh Token:', refreshToken);
        const {  name, emails ,photos} = profile;
        const user = {
          username:name,
          email: emails[0].value, 
          image:photos[0].value,
        };
        return user;
      }
}