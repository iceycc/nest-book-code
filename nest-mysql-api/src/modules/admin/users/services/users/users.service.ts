import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

import { CreateUserDto } from '../../controllers/users/dto/create.user.dto';
import { AdminUserEntity } from '../../entities/users.entity';
import { LoginDto } from '../../controllers/login/dto/login.dto';
import { ToolsService } from '@src/services/tools/tools.service';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(AdminUserEntity)
    private readonly userRepository: Repository<AdminUserEntity>,
    private readonly toolsService: ToolsService,
  ) { }

  /**
   * @Author: 水痕
   * @Date: 2020-08-14 09:25:49
   * @LastEditors: 水痕
   * @Description: 创建用户
   * @param {type} 
   * @return {type} 
   */
  async createUser(createUserDto: CreateUserDto): Promise<AdminUserEntity> {
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  /**
   * @Author: 水痕
   * @Date: 2020-08-14 11:53:45
   * @LastEditors: 水痕
   * @Description: 用户登录
   * @param {type} 
   * @return {type} 
   */
  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      if (this.toolsService.checkPassword(password, user.password)) {
        return {
          ...user.toResponseObject,
          token: 'aaa'
        };
      } else {
        throw new HttpException('用户名或者密码不正确', HttpStatus.OK);
      }
    } else {
      throw new HttpException(`${username}不存在`, HttpStatus.OK);
    }
  }
}
