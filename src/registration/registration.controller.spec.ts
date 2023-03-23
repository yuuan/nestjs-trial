import { Test, TestingModule } from '@nestjs/testing';
import { MailModule } from '@/mail/mail.module';
import { UsersModule } from '@/users/users.module';
import { RegistrationController } from './registration.controller';

describe('RegistrationController', () => {
  let controller: RegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, MailModule],
      controllers: [RegistrationController],
    }).compile();

    controller = module.get<RegistrationController>(RegistrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
