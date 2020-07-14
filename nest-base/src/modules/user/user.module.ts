import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LogModule } from '../log/log.module';

@Module({
  // 引入LogModule
  imports: [LogModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
