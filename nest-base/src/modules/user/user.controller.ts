import { Controller, Get, Query, ParseIntPipe, Param, Post, Body } from '@nestjs/common';

@Controller('user')
export class UserController {

  // // 批量获取全部的参数,接收到的是一个对象,你传递什么我就接收什么
  // @Get()
  // userList(
  //   @Query() query: any
  // ): string {
  //   console.log(query);
  //   return '用户列表';
  // }


  // 只接收全部参数里面的其中一个或者多个,ParseIntPipe是nestjs中内置管道
  @Get()
  userList(
    @Query('age', new ParseIntPipe()) age: number,
    @Query('name') name: string
  ): string {
    // 我只要age和name字段,别的你传递多的给我，我也不接收也不处理
    console.log(age, name);
    return '用户列表'
  }

  @Get(':id')
  user(
    @Param() params: any
  ): string {
    console.log(params); //输出{ id: '2' }
    return '用户信息'
  }

  @Get(":id")
  userInfo(
    @Param('id', new ParseIntPipe()) id: number
  ) {
    console.log(id);
    return "用户详情"
  }

  @Post()
  addUser(
    @Body() body: any
  ) {
    // 这种写法适合大规模的提交参数,自己又不想一个一个去校验
    console.log(body);
    return body
  }
}
