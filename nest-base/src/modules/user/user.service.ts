import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginDto } from './login/dto/login.dto';
import { ToolsService } from 'src/services/tools/tools.service';
import { jwt } from 'src/utils';
import { RedisUtilsService } from '../redis-utils/redis-utils.service';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly toolsService: ToolsService,
    private readonly redisUtilsService: RedisUtilsService,
  ) { }

  // 创建数据,传递一个对象类型的数据
  async createUser(data: CreateUserDto): Promise<any> {
    const user = await this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async login(data: LoginDto): Promise<any | string> {
    // 根据用户名去查询数据,然后验证密码
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && this.toolsService.checkPassword(password, user.password)) {
      // 登录成功生成token、获取该用户的资源存到redis中
      // 1.生成token
      const token = jwt.createToken(String(user.id));
      // 2.token存到到redis中
      const redisData = {
        token,
        user,
      }
      this.redisUtilsService.set(String(user.id), redisData);
      return { ...user, token };
    } else {
      return '账号或密码错误';
    }
  }
  
  // 查询全部的数据
  async userList(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
