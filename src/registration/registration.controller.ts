import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './register-user.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async store(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.create(registerUserDto);
  }
}
