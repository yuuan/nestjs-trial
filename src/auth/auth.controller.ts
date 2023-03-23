import {
  Controller,
  UseGuards,
  Get,
  Post,
  HttpCode,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { UserResponse } from '@/responses/user.response';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('auth/login')
  @HttpCode(200)
  async login(@Request() request: any) {
    return new UserResponse(request.user);
  }

  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('auth/me')
  async me(@Request() request: any) {
    return new UserResponse(request.user);
  }

  @Post('auth/logout')
  @HttpCode(204)
  async logout(@Request() request: any): Promise<void> {
    request.session.destroy();
  }
}
