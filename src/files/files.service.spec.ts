import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { initialize, FileFactory } from '@/prisma/factories';
import { FilesService } from './files.service';

describe('FilesService', () => {
  let prisma: PrismaService;
  let filesService: FilesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PrismaService, FilesService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    filesService = module.get<FilesService>(FilesService);

    initialize({ prisma });
  });

  it('should be defined', () => {
    expect(filesService).toBeDefined();
  });

  describe('#findById', () => {
    describe('when a nonexistent id is specified', () => {
      const nonexistentId = 0;

      it('should not be found by the given id', async () => {
        expect(await filesService.findById(nonexistentId)).toBeNull();
      });
    });

    describe('when an existing id is specified', () => {
      let id: number;

      beforeAll(async () => {
        const file = await FileFactory.create();
        id = file.id;
      });

      afterAll(() => {
        prisma.file.deleteMany({ where: {} });
        prisma.user.deleteMany({ where: {} });
      });

      it('should be found by the given id', async () => {
        expect(await filesService.findById(id)).toBeTruthy();
      });
    });
  });
});
