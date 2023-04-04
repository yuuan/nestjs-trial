import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { File } from '@prisma/client';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<File | null> {
    return this.prisma.file.findUnique({
      where: { id },
    });
  }
}
