import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {

  log(str: string): void {
    console.log('我是log日志:' + str);
  }

  error(str: string): void {
    console.error('我是error日志:',str);
  }
}
    