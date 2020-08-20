import { Module } from '@nestjs/common';
import { RoleController } from './controllers/role/role.controller';
import { RoleService } from './services/role/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { ToolsService } from '@src/services/tools/tools.service';
import { RoleAccessController } from './controllers/role-access/role-access.controller';
import { RoleAccessService } from './services/role-access/role-access.service';
import { RoleAccessEntity } from './entities/role.access.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleEntity,
      RoleAccessEntity,
    ])
  ],
  controllers: [
    RoleController,
    RoleAccessController,
  ],
  providers: [
    RoleService,
    ToolsService,
    RoleAccessService,
  ]
})
export class RoleModule { }
