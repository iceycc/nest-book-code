import { Controller, HttpStatus, HttpCode, Post, Body, Delete, Param, ParseIntPipe, Patch, Get, Query } from '@nestjs/common';

import { UsersService } from '../../services/users/users.service';
import adminConfig from '@src/config/admin.config';
import { CreateUserDto } from './dto/create.user.dto';
import { AdminUserEntity } from '../../entities/users.entity';
import { ApiOperation, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update.user.dto';
import { ObjectType } from '@src/types';

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

  @ApiOperation({ summary: '修改数据', description: '根据id修改数据' })
  @Patch(':id')
  async modifyUserById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return await this.userService.modifyUserById(id, updateUserDto);
  }

  @ApiOperation({ summary: '查询单条数据', description: '根据id查询单条数据' })
  @Get(':id')
  async findById(
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<AdminUserEntity> {
    return await this.userService.findById(id);
  }

  @ApiOperation({
    summary: '查询全部的数据',
    description: '带分页及搜索条件的查询数据',
    externalDocs: {
      url: 'xxx?username=y&pageSize=10&pageNumber=1',
      description: '支持用户名模糊查询'
    }
  })
  @Get()
  async userList(
    @Query() queryOption: ObjectType
  ): Promise<any> {
    return await this.userService.userList(queryOption);
  }
}
