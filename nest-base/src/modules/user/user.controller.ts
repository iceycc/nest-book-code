import { Controller, Get } from '@nestjs/common';
import { LogService } from '../log/log.service';

@Controller('user')
export class UserController {
  constructor (
    private readonly logService: LogService,
  ) { }

  @Get()
  hello(): string {
    this.logService.log('hello的控制器');
    return 'hello word';
  }
}
