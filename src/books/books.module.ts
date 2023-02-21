import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';

@Module({
  imports: [HttpModule],
  providers: [BooksService],
})
export class BooksModule {}
