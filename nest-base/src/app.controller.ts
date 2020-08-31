import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';
import { type } from 'os';


@Controller()
export class AppController {
  constructor (
    @Inject('APP_SERVICE') readonly appService: AppService,
    @Inject('LOG') readonly loggerService: LoggerService,
    @Inject('IS_DEV') readonly isDev: { isDev: Function },
  ) { }

  @Get('nest')
  getHello(): string {
    this.loggerService.log('getHello');
    console.log(this.appService);
    console.log(this.isDev.isDev());
    return 'nestjs';
  }
}
