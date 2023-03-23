import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '@/users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async attemptLogin(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async getAuthenticatedUser(id: number): Promise<User | null> {
    return await this.usersService.findById(id);
  }
}
