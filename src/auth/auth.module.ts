import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController, fortytwo_Controller, googleController } from './auth.controller';
import { LocalStrategy } from './local.startegy';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from './google.startegy';
import { fortytwo_Strategy } from './42.strategy';


@Module({
  imports:[UserModule],
  providers: [AuthService,LocalStrategy,UserService,GoogleStrategy,fortytwo_Strategy],
  controllers: [AuthController,googleController,fortytwo_Controller]
})
export class AuthModule {}
