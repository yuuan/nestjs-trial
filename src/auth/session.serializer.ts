import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { User } from '@prisma/client';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, id: number) => void): void {
    done(null, user.id);
  }

  async deserializeUser(
    id: number,
    done: (err: Error, user: User | null) => void,
  ): Promise<void> {
    const user = await this.authService.getAuthenticatedUser(id);

    done(null, user);
  }
}
