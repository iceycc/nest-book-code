import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../user.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor (
    private readonly userService: UserService,
  ) { }

  @Post()
  async login(
    @Body() loginData: LoginDto,
  ): Promise<any | string> {
    return await this.userService.login(loginData);
  }
}
