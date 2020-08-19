import { Module } from '@nestjs/common';
import { RoleController } from './controllers/role/role.controller';
import { RoleService } from './services/role/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { ToolsService } from '@src/services/tools/tools.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleEntity,
    ])
  ],
  controllers: [
    RoleController,
  ],
  providers: [
    RoleService,
    ToolsService,
  ]
})
export class RoleModule { }
