import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService, SessionSerializer, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
