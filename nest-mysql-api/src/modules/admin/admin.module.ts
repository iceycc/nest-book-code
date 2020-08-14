import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { AccessModule } from './access/access.module';

@Module({
  imports: [UsersModule, RoleModule, AccessModule]
})
export class AdminModule {}
