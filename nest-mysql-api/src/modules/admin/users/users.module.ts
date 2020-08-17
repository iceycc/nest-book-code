import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users/users.controller';
import { LoginController } from './controllers/login/login.controller';
import { UsersService } from './services/users/users.service';
import { AdminUserEntity } from './entities/users.entity';
import { ToolsService } from '@src/services/tools/tools.service';
import { RedisUtilsModule } from '@src/modules/redis-utils/redis-utils.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminUserEntity,
    ]),
    RedisUtilsModule,
  ],
  controllers: [
    UsersController,
    LoginController
  ],
  providers: [
    UsersService,
    ToolsService,
  ]
})
export class UsersModule { }
