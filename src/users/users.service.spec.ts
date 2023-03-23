import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersService } from './users.service';
import { initialize, UserFactory } from '@/prisma/factories';
import { EmailMustBeUniqueError } from './email-must-be-unique.error';

describe('UsersService', () => {
  let prisma: PrismaService;
  let usersService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PrismaService, UsersService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);

    initialize({ prisma });
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('#findById', () => {
    describe('when a nonexistent id is specified', () => {
      const nonexistentId = 0;

      it('should not be found by the given id', async () => {
        expect(await usersService.findById(nonexistentId)).toBeNull();
      });
    });

    describe('when an existing id is specified', () => {
      let id: number;

      beforeAll(async () => {
        const user = await UserFactory.create();
        id = user.id;
      });

      afterAll(() => {
        prisma.user.deleteMany({ where: {} });
      });

      it('should be found by the given id', async () => {
        expect(await usersService.findById(id)).toBeTruthy();
      });
    });
  });

  describe('#findByEmail', () => {
    describe('when a nonexistent email is specified', () => {
      const nonexistentEmail = 'nonexistent@example.com';

      it('should not be found by the given email', async () => {
        expect(await usersService.findByEmail(nonexistentEmail)).toBeNull();
      });
    });

    describe('when an existing email is specified', () => {
      const email = 'existent@example.com';

      beforeAll(async () => {
        await UserFactory.create({ email });
      });

      afterAll(async () => {
        await prisma.user.deleteMany({ where: {} });
      });

      it('should be found by the given email', async () => {
        expect(await usersService.findByEmail(email)).toBeTruthy();
      });
    });
  });

  describe('#create', () => {
    describe('when create with new email', () => {
      const email = 'new@example.com';
      const createUserDto = {
        name: 'NAME',
        password: 'PASSWORD',
        email,
      };

      afterAll(async () => {
        await prisma.user.deleteMany({ where: {} });
      });

      it('should be created', async () => {
        expect(await usersService.create(createUserDto)).toBeTruthy();
      });
    });

    describe('when create with existing email', () => {
      const email = 'existet@example.com';
      const createUserDto = {
        name: 'NAME',
        password: 'PASSWORD',
        email,
      };

      beforeAll(async () => {
        await UserFactory.create({ email });
      });

      afterAll(async () => {
        await prisma.user.deleteMany({ where: {} });
      });

      it('should throw an exception', async () => {
        await expect(usersService.create(createUserDto)).rejects.toThrow(
          EmailMustBeUniqueError,
        );
      });
    });
  });
});
