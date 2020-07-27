import { Controller, Get, Request, Response } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  index(
    @Request() req: { [key: string]: any }
  ): string {
    console.log(req.session);
    return '用户主页';
  }

  @Get('login')
  login(
    @Response() res: { [key: string]: any },
    @Request() req: { [key: string]: any }
  ): void {
    req.session.name = 'hello';
    // 再次提醒使用了@Response就不能使用return
    res.send('登录页面')
  }
}
