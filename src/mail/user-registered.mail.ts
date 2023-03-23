import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';

@Injectable()
export class UserRegisteredMail {
  constructor(private readonly mailerService: MailerService) {}

  async send(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Your user is registrated.',
      template: './user-registered',
      context: {
        user: user,
      },
    });
  }
}
