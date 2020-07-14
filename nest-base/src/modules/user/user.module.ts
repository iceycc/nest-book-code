import { Module } from '@nestjs/common';
import { LogModule } from '../log/log.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    LogModule.register('user')
  ],
  controllers: [UserController]
})
export class UserModule { }
