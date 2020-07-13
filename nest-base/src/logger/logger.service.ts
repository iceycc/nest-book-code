import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {

  log(str: string): void {
    console.log(str);
  }

  error(str: string): void {
    console.error(str);
  }
}
