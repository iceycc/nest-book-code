import { Test, TestingModule } from '@nestjs/testing';
import { UsersRoleService } from './users-role.service';

describe('UsersRoleService', () => {
  let service: UsersRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRoleService],
    }).compile();

    service = module.get<UsersRoleService>(UsersRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
