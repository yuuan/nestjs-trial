import { initialize, FileFactory } from '@/prisma/factories';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { FilesController } from './files.controller';
import { FilesModule } from './files.module';

describe('FilesController', () => {
  let prisma: PrismaService;
  let filesController: FilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, FilesModule],
      controllers: [FilesController],
      providers: [PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    filesController = module.get<FilesController>(FilesController);

    initialize({ prisma });
  });

  it('should be defined', () => {
    expect(filesController).toBeDefined();
  });

  describe('show', () => {
    let id: number;
    let mockedRequest: Request;

    const mockedResponse = {
      setHeader: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    beforeAll(async () => {
      const file = await FileFactory.create();
      id = file.id;

      const user = await prisma.user.findUnique({
        where: { id: file.author_id },
      });
      mockedRequest = { user } as unknown as Request;
    });

    afterAll(() => {
      prisma.file.deleteMany({ where: {} });
      prisma.user.deleteMany({ where: {} });
    });

    it('should send contents', async () => {
      const spy = jest.spyOn(mockedResponse, 'send');

      await filesController.show(mockedRequest, id, mockedResponse);

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });
  });
});
