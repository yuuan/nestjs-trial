import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BooksService {
  constructor(private readonly httpService: HttpService) {}

  async find(isbn: string): Promise<any> {
    const observable = this.httpService.get('https://api.openbd.jp/v1/get', {
      params: {
        isbn: isbn,
      },
    });
    const response = await lastValueFrom(observable);

    return response.data;
  }
}
