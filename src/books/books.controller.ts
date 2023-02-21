import { Controller, Get, Param } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get(':isbn')
  async show(@Param('isbn') isbn: string): Promise<any> {
    return await this.booksService.find(isbn);
  }
}
