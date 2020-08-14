import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';

import adminConfig from '@src/config/admin.config';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../../services/users/users.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('后台管理登录')
@Controller(`${adminConfig.adminPath}/login`)
export class LoginController {
  constructor (
    private readonly userService: UsersService,
  ) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<any> {
    return await this.userService.login(loginDto);
  }
}
