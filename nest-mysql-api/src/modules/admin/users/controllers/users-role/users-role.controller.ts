import { Controller, UseGuards, Get, HttpCode, Param, HttpStatus, Post, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { AuthGuard } from '@src/guard/auth.guard';
import adminConfig from '@src/config/admin.config';
import { AssignRoleDto } from './dto/assign_role.dto';
import { UsersRoleService } from '../../services/users-role/users-role.service';

@ApiTags('用户与角色模块')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller(`${adminConfig.adminPath}/users_role`)
export class UsersRoleController {
  constructor (
    private readonly usersRoleService: UsersRoleService,
  ) { }

  @ApiOperation({ summary: '获取可分配角色(获取角色树)', description: '根据当前的用户id获取角色' })
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async roleTree(
    @Param('userId', new ParseIntPipe()) userId: number
  ): Promise<any> {
    return this.usersRoleService.roleTree(userId);
  }


  @ApiOperation({ summary: '给用户分配角色', description: '传递userId和roleList数组' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async assignRole(
    @Body() data: AssignRoleDto
  ): Promise<any> {
    return await this.usersRoleService.assignRole(data);
  }
}
