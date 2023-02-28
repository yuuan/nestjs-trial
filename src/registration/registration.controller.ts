import { BadRequestException, Body, Controller, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRegisteredMail } from '../mail/user-registered.mail';
import { RegisterUserDto } from './register-user.dto';
import { EmailMustBeUniqueError } from 'src/users/email-must-be-unique.error';

@Controller('registration')
export class RegistrationController {
  constructor(
    private userService: UsersService,
    private userRegisteredMail: UserRegisteredMail,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async store(@Body() registerUserDto: RegisterUserDto) {
    try {
      const user = await this.userService.create(registerUserDto);

      this.userRegisteredMail.send(user);

      return user;
    }
    catch (e) {
      if (e instanceof EmailMustBeUniqueError) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: [ e.message ],
          error: 'Bad Request',
        });
      }
    }
  }
}
