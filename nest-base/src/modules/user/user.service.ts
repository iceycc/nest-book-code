import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  // 创建数据,传递一个对象类型的数据
  async createUser(data: { [propName: string]: any }): Promise<UserEntity> {
    return await this.userRepository.save(data);
  }

  // 查询全部的数据
  async userList(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
