import { Module } from '@nestjs/common';
import { AccessService } from './services/access/access.service';
import { AccessController } from './controllers/access/access.controller';
import { ToolsService } from '@src/services/tools/tools.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessEntity } from './entities/access.entity';
import { MenusController } from './controllers/menus/menus.controller';
import { MenusService } from './services/menus/menus.service';
import { UsersRoleEntity } from '../users/entities/users.role.entity';
import { RoleAccessEntity } from '../role/entities/role.access.entity';
import { AdminUserEntity } from '../users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminUserEntity,
      AccessEntity,
      UsersRoleEntity,
      RoleAccessEntity,
    ])
  ],
  providers: [
    AccessService,
    ToolsService,
    MenusService,
  ],
  controllers: [AccessController, MenusController]
})
export class AccessModule { }
