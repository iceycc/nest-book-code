import { Controller, Body, Post, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService,
  ) { }

  @Post()
  async createUser(
    @Body() data: CreateUserDto
  ): Promise<UserEntity> {
    return await this.userService.createUser(data);
  }

  @Get()
  @UseGuards(AuthGuard)
  async userList(): Promise<UserEntity[]> {
    console.log('获取用户数据');
    return await this.userService.userList();
  }
}
