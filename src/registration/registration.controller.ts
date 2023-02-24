import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRegisteredMail } from '../mail/user-registered.mail';
import { RegisterUserDto } from './register-user.dto';

@Controller('registration')
export class RegistrationController {
  constructor(
    private userService: UsersService,
    private userRegisteredMail: UserRegisteredMail,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async store(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.userService.create(registerUserDto);

    this.userRegisteredMail.send(user);

    return user;
  }
}
