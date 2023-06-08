import {  PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from 'passport-google-oauth20';
export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(){
        super({
            clientID:'154782931535-ftdo0053qmtsbcjb8rtpep6m13rhn7du.apps.googleusercontent.com',
            clientSecret:'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',
            callbackURL:'http://localhost:3000/auth/from-google',
            scope:['email','Profile'],
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