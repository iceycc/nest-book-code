import { Controller, Get, Render, Post, Body, Response } from '@nestjs/common';

@Controller('user')
export class UserController {

  @Get()
  index(): string {
    return '用户主页';
  }

  @Get('login')
  @Render('login')
  loginPage() {
    return { title: '登录页面' };
  }

  @Post('login')
  login(
    @Body() body: any,
    @Response() res: any
  ) {
    console.log(body, '接受页面传递来的数据');
    res.redirect('/user');
  }
}
