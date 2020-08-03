import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService,
  ) { }

  @Post()
  @UseGuards(AuthGuard)
  async createUser(
    @Body() data: { [propName: string]: any }
  ): Promise<UserEntity> {
    return await this.userService.createUser(data);
  }

  @Get()
  async userList(): Promise<UserEntity[]> {
    console.log('获取用户数据');
    return await this.userService.userList();
  }
}
