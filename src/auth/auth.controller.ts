import {
  Controller,
  UseGuards,
  Post,
  HttpCode,
  Request,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(200)
  async login(@Request() request: any) {
    return request.user;
  }
}
