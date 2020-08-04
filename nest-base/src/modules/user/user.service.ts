import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { CreateUserTdo } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  // 创建数据,传递一个对象类型的数据
  async createUser(data: CreateUserTdo): Promise<UserEntity> {
    const user = await this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  // 查询全部的数据
  async userList(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
