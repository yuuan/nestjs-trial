import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [AuthModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
