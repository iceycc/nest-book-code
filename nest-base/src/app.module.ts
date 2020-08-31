import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';
import { UserModule } from './user/user.module';
import { HomeController } from './home/home.controller';

@Module({
  imports: [UserModule],
  controllers: [AppController, HomeController],
  providers: [
    {
      provide: 'LOG',
      useClass: LoggerService,
    },
    {
      provide: 'LOG2',
      useClass: LoggerService,
    },
    {
      provide: 'APP_SERVICE',
      useFactory: (logger, logger2) => {
        logger.log('使用工厂方式');
        logger2.error('测试2222');
        return '工厂方法返回';
      },
      inject: ['LOG', 'LOG2'],
    },
    {
      provide: 'IS_DEV',
      useValue: { isDev:()=>{
        return Math.random()
      }},
    },
  ],
  exports: [],
})
export class AppModule {}
