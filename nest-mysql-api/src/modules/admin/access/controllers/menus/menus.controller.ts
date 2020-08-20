import { Controller, UseGuards, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@src/guard/auth.guard';
import adminConfig from '@src/config/admin.config';
import { CurrentUser } from '@src/decorators/current.user';
import { ObjectType } from '@src/types';
import { MenusService } from '../../services/menus/menus.service';

@ApiTags('菜单模块')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller(`${adminConfig.adminPath}/menus`)
export class MenusController {
  constructor (
    private readonly menusService: MenusService,
  ) { }

  @ApiOperation({ summary: '全部的菜单列表', description: '根据当前用户的权限获取对应的菜单' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async menusList(
    @CurrentUser() userInfo: ObjectType
  ): Promise<any> {
    return this.menusService.menusList(userInfo);
  }
}
