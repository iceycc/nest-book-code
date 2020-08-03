import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ])
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class UserModule { }
