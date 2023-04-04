import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let booksService: BooksService;
  const httpService: HttpService = new HttpService();

  const isbn = '9784774196053';

  describe('find', () => {
    const responseBody = ['success'];

    beforeEach(async () => {
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() =>
          of({ data: responseBody } as AxiosResponse),
        );

      booksService = new BooksService(httpService);
    });

    it('should return the bibliographic infomation for the specified book', async () => {
      const book = await booksService.find(isbn);

      expect(book).toEqual(responseBody);
    });
  });
});
