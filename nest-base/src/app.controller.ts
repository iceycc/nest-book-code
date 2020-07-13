import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';
import { type } from 'os';


@Controller()
export class AppController {
  constructor (
    @Inject('APP_SERVICE') readonly appService: AppService,
    @Inject('LOG') readonly loggerService: LoggerService,
    @Inject('IS_DEV') readonly isDev: { isDev: boolean },
  ) { }

  @Get()
  getHello(): string {
    this.loggerService.log('日志');
    console.log(this.appService);
    console.log(this.isDev);
    return 'nestjs';
  }
}
