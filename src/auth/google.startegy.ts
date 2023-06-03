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
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
      
        // Perform additional operations with the tokens
        // For example, you can validate the tokens, store them, or make requests to Google APIs using the tokens
      
        // Process the user's profile information
        const {  name, emails ,photos} = profile;
        const user = {
          username:name.giveName,
          email: emails[0].value, 
          image:photos[0].value,
        };
        
        // Return the authenticated user

        console.log("user: " + user.image);
        return user;
      }
}