import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor (
    private readonly authService: AuthService,
  ) { }

  // 直接用get模拟下
  @Get()
  async login(): Promise<any[]> {
    // 从授权的模块中获取授权列表
    const auth = await this.authService.getPromiseList();
    return auth;
  }
}
