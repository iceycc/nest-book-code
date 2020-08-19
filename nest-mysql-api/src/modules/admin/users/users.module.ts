import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users/users.controller';
import { LoginController } from './controllers/login/login.controller';
import { UsersService } from './services/users/users.service';
import { AdminUserEntity } from './entities/users.entity';
import { ToolsService } from '@src/services/tools/tools.service';
import { RedisUtilsModule } from '@src/modules/redis-utils/redis-utils.module';
import { UsersRoleController } from './controllers/users-role/users-role.controller';
import { UsersRoleService } from './services/users-role/users-role.service';
import { UsersRoleEntity } from './entities/users.role.entity';
import { RoleEntity } from '../role/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminUserEntity,
      UsersRoleEntity,
      RoleEntity,
    ]),
    RedisUtilsModule,
  ],
  controllers: [
    UsersController,
    LoginController,
    UsersRoleController
  ],
  providers: [
    UsersService,
    ToolsService,
    UsersRoleService,
  ]
})
export class UsersModule { }
