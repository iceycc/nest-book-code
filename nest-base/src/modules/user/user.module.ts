import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoginController } from './login/login.controller';
import { ToolsService } from 'src/services/tools/tools.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ])
  ],
  controllers: [
    UserController,
    LoginController
  ],
  providers: [
    UserService,
    ToolsService
  ]
})
export class UserModule { }
