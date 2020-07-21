import { Controller, Get, Request, Response } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  index(
    @Request() req: any
  ): string {
    console.log(req.cookies, '当前的cookie')
    return '主页';
  }

  @Get('login')
  login(
    @Response() res: any,
  ): void {
    // 如果使使用了res就不能使用return，必须使用send
    res.cookie('name', 'hello', { maxAge: 1000 * 5, httpOnly: true });
    res.send('登录页面');
  }
}
