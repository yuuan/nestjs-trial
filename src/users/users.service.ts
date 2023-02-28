import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { EmailMustBeUniqueError } from './email-must-be-unique.error';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(createUserDto: any): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: await bcrypt.hash(createUserDto.password, 10),
        },
      });
      return user;
    } catch (e) {
      if (e.code === 'P2002' && e.meta.target === 'users_email_key') {
        throw new EmailMustBeUniqueError(createUserDto.email);
      } else {
        throw e;
      }
    }
  }
}
