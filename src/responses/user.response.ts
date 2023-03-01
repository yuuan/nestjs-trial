import { Exclude } from 'class-transformer';

export class UserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: Date | null;
  updatedAt: Date | null;

  @Exclude()
  password: string;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
