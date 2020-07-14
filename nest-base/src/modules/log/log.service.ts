import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class LogService {
  constructor (
    @Inject('PREFIX') private readonly prefix: string,
  ) { }

  log(str: string): void {
    console.log(`${this.prefix}-${str}`);
  }
}
