import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app';
import mailConfig from './config/mail';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RegistrationModule } from './registration/registration.module';
import { BooksModule } from './books/books.module';
import { MailModule } from './mail/mail.module';
import { ResponsesModule } from './responses/responses.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, mailConfig],
    }),
    AuthModule,
    RegistrationModule,
    FilesModule,
    BooksModule,
    MailModule,
    ResponsesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
