import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController, googleController } from './auth.controller';
import { LocalStrategy } from './local.startegy';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from './google.startegy';


@Module({
  imports:[UserModule],
  providers: [AuthService,LocalStrategy,UserService,GoogleStrategy],
  controllers: [AuthController,googleController]
})
export class AuthModule {}
