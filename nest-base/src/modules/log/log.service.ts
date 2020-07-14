import { Injectable } from '@nestjs/common';

@Injectable()
export class LogService {

  log(str: string): void {
    console.log(str);
  }

  error(str: string): void {
    console.log(str);
  }
}
