import { Module } from '@nestjs/common';
import { MailModule } from '@/mail/mail.module';
import { UsersModule } from '@/users/users.module';
import { ResponsesModule } from '@/responses/responses.module';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';

@Module({
  imports: [UsersModule, MailModule, ResponsesModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
