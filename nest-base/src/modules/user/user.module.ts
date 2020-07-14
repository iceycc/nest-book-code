import { Module } from '@nestjs/common';
import { LogModule } from '../log/log.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    LogModule.forRoot('user')
  ],
  controllers: [UserController]
})
export class UserModule { }
