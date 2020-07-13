import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'LOG',
      useClass: LoggerService
    },
    {
      provide: 'APP_SERVICE',
      useFactory: (logger) => {
        logger.log('使用工厂方式');
        return '工厂方法返回';
      },
      inject: ['LOG']
    },
    {
      provide: 'IS_DEV',
      useValue: { isDev: true }
    }
  ],
  exports: []
})
export class AppModule { }
