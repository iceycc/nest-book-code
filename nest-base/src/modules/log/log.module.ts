import { Module, DynamicModule } from '@nestjs/common';
import { LogService } from './log.service';

@Module({})
export class LogModule {
  // register函数中可以接收外部传递过来的变量,或者对象
  static register(prefix: string): DynamicModule {
    return {
      module: LogModule,
      providers: [
        LogService,
        // 使用useValue的方式在模块中注入一个变量,可以理解为在该模块中注入了别的模块,只是注入的方式不是采用import
        // 而是采用模块调用静态方法的方式
        {
          provide: 'PREFIX',
          useValue: prefix
        }
      ],
      // 动态模块一样的也要对外暴露出去
      exports: [LogService]
    }
  }
}
