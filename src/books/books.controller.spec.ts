import { Test } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksModule } from './books.module';
import { BooksService } from './books.service';

describe('BooksController', () => {
  const isbn = '9784774196053';
  const responseBody = ['success'];
  const mockedBooksService = { find: () => responseBody };

  let booksController: BooksController;

  describe('show', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [BooksModule],
      })
        .overrideProvider(BooksService)
        .useValue(mockedBooksService)
        .compile();
      booksController = moduleRef.get<BooksController>(BooksController);
    });

    it('should return the bibliographic infomation for the specified book', async () => {
      const response = await booksController.show(isbn);

      expect(response).toEqual(responseBody);
    });
  });
});
