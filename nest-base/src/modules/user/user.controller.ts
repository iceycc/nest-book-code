import { Controller, Body, Post, Get, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserTdo } from './dto/create.user.dto';

@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService,
  ) { }

  @Post()
  async createUser(
    @Body() data: CreateUserTdo
  ): Promise<UserEntity> {
    return await this.userService.createUser(data);
  }

  @Get()
  async userList(): Promise<UserEntity[]> {
    console.log('获取用户数据');
    throw new HttpException({ message: '获取数据错误', code: 2000 }, HttpStatus.OK);
    return await this.userService.userList();
  }
}
