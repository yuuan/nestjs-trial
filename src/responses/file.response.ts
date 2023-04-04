import { Exclude } from 'class-transformer';
import { UserResponse } from './user.response';

export class FileResponse {
  id: number;
  author: UserResponse;
  name: string;
  mime: string;
  createdAt: Date | null;
  updatedAt: Date | null;

  @Exclude()
  content: Buffer;

  @Exclude()
  author_id: number;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
    this.author = new UserResponse(partial.author);
  }
}
