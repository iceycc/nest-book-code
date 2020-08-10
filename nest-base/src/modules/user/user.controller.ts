import { Controller, Body, Post, Get, HttpException, HttpStatus, UseGuards, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('用户模块')
@ApiBearerAuth() // 文档上会有一把锁的状态
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService,
  ) { }

  @ApiOperation({ summary: '创建用户', description: '输入用户名及密码' })
  @ApiCreatedResponse({
    type: CreateUserDto,
    description: '创建用户DTO'
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() data: CreateUserDto
  ): Promise<UserEntity> {
    return await this.userService.createUser(data);
  }

  @ApiOperation({ summary: '用户列表', description: '获取用户列表' })
  @Get()
  async userList(): Promise<UserEntity[]> {
    console.log('获取用户数据');
    return await this.userService.userList();
  }
}
