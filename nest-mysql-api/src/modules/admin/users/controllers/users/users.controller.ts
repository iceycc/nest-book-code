import { Controller, HttpStatus, HttpCode, Post, Body, Delete, Param, ParseIntPipe } from '@nestjs/common';

import { UsersService } from '../../services/users/users.service';
import adminConfig from '@src/config/admin.config';
import { CreateUserDto } from './dto/create.user.dto';
import { AdminUserEntity } from '../../entities/users.entity';
import { ApiOperation, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('用户模块')
@Controller(`${adminConfig.adminPath}/users`)
export class UsersController {
  constructor (
    private readonly userService: UsersService,
  ) { }

  @ApiOperation({ summary: '创建用户', description: '输入用户名及密码' })
  @ApiCreatedResponse({
    type: CreateUserDto,
    description: '创建用户DTO'
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<AdminUserEntity> {
    return await this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: '删除数据', description: '根据用户id删除数据' })
  @Delete(':id')
  async deleteById(
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<string> {
    return await this.userService.deleteById(id);
  }
}
