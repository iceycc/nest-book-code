import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  getHello(): any {
    return { name: '哈哈' };
  }
}
