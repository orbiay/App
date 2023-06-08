import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenGuard } from './auth/guards';
import { JWToken } from './auth/jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule,UserModule,JwtModule.register({
    secret: 'k9vL9fr02UHQm1I7C5sO8bjdMnG3FpWz', 
    signOptions: { expiresIn: '3m' }, 
  })],
  controllers: [AppController],
  providers: [AppService,TokenGuard,JWToken],
})
export class AppModule {}
