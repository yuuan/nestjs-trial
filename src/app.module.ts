import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RegistrationModule } from './registration/registration.module';
import { BooksModule } from './books/books.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [AuthModule, RegistrationModule, BooksModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
