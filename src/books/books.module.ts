import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [HttpModule],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
