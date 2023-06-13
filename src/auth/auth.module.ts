import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController, fortytwo_Controller, googleController } from './auth.controller';
import { LocalStrategy } from './local.startegy';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from './google.startegy';
import { fortytwo_Strategy } from './42.strategy';
import { PassportModule } from '@nestjs/passport';
import { TokenGuard } from './guards';
import { JWToken } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports:[UserModule,PassportModule.register({defaultStrategy: '42'}),JwtModule.register({
    secret: 'k9vL9fr02UHQm1I7C5sO8bjdMnG3FpWz', 
    signOptions: { expiresIn: '3m' }, 
  })],
  providers: [AuthService,LocalStrategy,UserService,GoogleStrategy,fortytwo_Strategy,TokenGuard,JWToken],
  controllers: [AuthController,googleController,fortytwo_Controller]
})
export class AuthModule {}
