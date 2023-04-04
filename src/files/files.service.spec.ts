import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { initialize, FileFactory, UserFactory } from '@/prisma/factories';
import { FilesService } from './files.service';
import { User } from '@prisma/client';

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

  describe('create', () => {
    let author: User;
    let originalFile: Express.Multer.File;

    beforeAll(async () => {
      author = await UserFactory.create();
      originalFile = {
        originalname: 'NAME',
        mimetype: 'text/plain',
        buffer: Buffer.from('ABC'),
      } as Express.Multer.File;
    });

    afterAll(() => {
      prisma.file.deleteMany({ where: {} });
      prisma.user.deleteMany({ where: {} });
    });

    it('should register the specified file', async () => {
      const file = await filesService.create(originalFile, author);

      expect(file).toBeTruthy();
      expect(file.author_id).toEqual(author.id);

      // File の定義に author が含まれないため any で回避
      expect((file as any).author.id).toEqual(author.id);
    });
  });
});
