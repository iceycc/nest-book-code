import { Module } from '@nestjs/common';
import { LogService } from './log.service';

@Module({
  providers: [LogService],
  // 这里是以数组的方式,表示一个模块里面可以对外暴露多个
  exports: [LogService],
})
export class LogModule { }
