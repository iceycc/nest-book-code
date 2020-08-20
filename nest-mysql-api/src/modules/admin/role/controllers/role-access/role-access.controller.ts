import { Controller, Post, HttpCode, HttpStatus, UseGuards, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import adminConfig from '@src/config/admin.config';
import { AuthGuard } from '@src/guard/auth.guard';
import { AssignAccessDto } from './dto/assign_access.dto';
import { RoleAccessService } from '../../services/role-access/role-access.service';


@ApiTags('角色资源模块')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller(`${adminConfig.adminPath}/role_access`)

export class RoleAccessController {
  constructor (
    private readonly roleAccessService: RoleAccessService,
  ) { }

  @ApiOperation({ summary: '给角色分配权限', description: '传递roleId和accessList数组' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async assignAccess(
    @Body() data: AssignAccessDto
  ): Promise<any> {
    return await this.roleAccessService.assignAccess(data);
  }

  @ApiOperation({
    summary: '获取角色权限',
    description: '根据类别获取角色权限,type:1表示菜单,2表示接口,roleId:当前点击行的id'
  })
  @Get('/:type/:roleId')
  @HttpCode(HttpStatus.OK)
  async authorizationList(
    @Param('type', new ParseIntPipe()) type: number,
    @Param('roleId', new ParseIntPipe()) roleId: number
  ): Promise<any> {
    return this.roleAccessService.authorizationList(type, roleId);
  }
}
