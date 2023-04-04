import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { File, User } from '@prisma/client';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<File | null> {
    return this.prisma.file.findUnique({
      include: {
        author: true,
      },
      where: { id },
    });
  }

  async create(file: Express.Multer.File, author: User): Promise<File> {
    return await this.prisma.file.create({
      data: {
        author_id: author.id,
        name: file.originalname,
        mime: file.mimetype,
        content: file.buffer,
      },
      include: {
        author: true,
      },
    });
  }
}
