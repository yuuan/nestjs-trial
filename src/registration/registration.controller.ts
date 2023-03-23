import {
  Controller,
  UseInterceptors,
  UsePipes,
  Body,
  ClassSerializerInterceptor,
  ValidationPipe,
  Post,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { UserRegisteredMail } from '@/mail/user-registered.mail';
import { RegisterUserDto } from './register-user.dto';
import { EmailMustBeUniqueError } from '@/users/email-must-be-unique.error';
import { UserResponse } from '@/responses/user.response';

@Controller('registration')
export class RegistrationController {
  constructor(
    private userService: UsersService,
    private userRegisteredMail: UserRegisteredMail,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async store(@Body() registerUserDto: RegisterUserDto) {
    try {
      const user = await this.userService.create(registerUserDto);

      this.userRegisteredMail.send(user);

      return new UserResponse(user);
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
