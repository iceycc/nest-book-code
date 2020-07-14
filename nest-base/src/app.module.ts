import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { LogModule } from './modules/log/log.module';

@Module({
  imports: [UserModule, LogModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
