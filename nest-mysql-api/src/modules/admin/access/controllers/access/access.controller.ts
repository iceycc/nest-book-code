import { Controller, UseGuards, Post, HttpCode, HttpStatus, Body, Delete, Param, Patch, Get, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@src/guard/auth.guard';
import adminConfig from '@src/config/admin.config';
import { CreateAccessDto } from './dto/create.access.dto';
import { UpdateAccessDto } from './dto/update.access.dto';
import { ObjectType } from '@src/types';
import { AccessService } from '../../services/access/access.service';

@ApiTags('资源模块')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller(`${adminConfig.adminPath}/access`)
export class AccessController {
  constructor (
    private readonly accessService: AccessService
  ) { }

  @ApiOperation({ summary: '创建资源', description: '创建资源' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAccess(
    @Body() createAccessDto: CreateAccessDto
  ): Promise<any> {
    return await this.accessService.createAccess(createAccessDto);
  }


  @ApiOperation({ summary: '删除资源', description: '根据id删除权限' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteById(
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<string> {
    return await this.accessService.deleteById(id);
  }


  @ApiOperation({ summary: '修改权限', description: '根据id修改权限' })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() data: UpdateAccessDto
  ): Promise<any> {
    return await this.accessService.updateById(id, data);
  }

  @ApiOperation({
    summary: '全部的模块、菜单列表',
    description: '获取模块或菜单',
    externalDocs: {
      url: '节点类型:1、表示模块顶级模块 2、表示菜单 3、操作'
    }
  })
  @Get('module/:type')
  @HttpCode(HttpStatus.OK)
  async moduleList(
    @Param('type', new ParseIntPipe()) type: number
  ): Promise<any> {
    return this.accessService.moduleList(type);
  }


  @ApiOperation({ summary: '权限列表', description: '获取权限列表' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async accessList(
    @Query() queryOption: ObjectType
  ): Promise<any[]> {
    return await this.accessService.accessList(queryOption);
  }
}
