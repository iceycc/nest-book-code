import { Test, TestingModule } from '@nestjs/testing';
import { UsersRoleController } from './users-role.controller';

describe('UsersRole Controller', () => {
  let controller: UsersRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersRoleController],
    }).compile();

    controller = module.get<UsersRoleController>(UsersRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
