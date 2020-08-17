import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

import { CreateUserDto } from '../../controllers/users/dto/create.user.dto';
import { AdminUserEntity } from '../../entities/users.entity';
import { LoginDto } from '../../controllers/login/dto/login.dto';
import { ToolsService } from '@src/services/tools/tools.service';
import { UpdateUserDto } from '../../controllers/users/dto/update.user.dto';
import { ObjectType } from '@src/types';

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
   * @Date: 2020-08-14 16:50:31
   * @LastEditors: 水痕
   * @Description: 根据id删除数据
   * @param {type} 
   * @return {type} 
   */
  async deleteById(id: number): Promise<string> {
    const { raw: { affectedRows } } = await this.userRepository.update(id, { isDel: 1 });
    if (affectedRows) {
      return '删除成功';
    } else {
      return '删除失败';
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2020-08-17 07:51:11
   * @LastEditors: 水痕
   * @Description: 根据id修改密码
   * @param {type} 
   * @return {type} 
   */
  async modifyUserById(id: number, data: UpdateUserDto): Promise<string> {
    const { password, newPassword } = data;
    const currentUser = await this.userRepository.findOne({ where: { id } });
    if (this.toolsService.checkPassword(password, currentUser.password)) {
      const { raw: { affectedRows } } = await this.userRepository.update(id, { password: this.toolsService.makePassword(newPassword) });
      if (affectedRows) {
        return '修改成功';
      } else {
        return '修改失败';
      }
    } else {
      throw new HttpException('旧密码验证错误', HttpStatus.OK);
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2020-08-17 08:00:42
   * @LastEditors: 水痕
   * @Description: 根据id查询单条数据
   * @param {type} 
   * @return {type} 
   */
  async findById(id: number): Promise<AdminUserEntity> {
    return await this.userRepository.findOne({ id, isDel: 0 });
  }

  /**
   * @Author: 水痕
   * @Date: 2020-08-17 08:08:35
   * @LastEditors: 水痕
   * @Description: 查询全部的数据
   * @param {type} 
   * @return {type} 
   */
  async userList(queryOption: ObjectType): Promise<any> {
    const { pageSize = 10, pageNumber = 1, username } = queryOption;
    this.toolsService.checkPage(pageSize, pageNumber);
    const queryConditionList = ['user.isDel = 0'];
    if (username) {
      queryConditionList.push('user.username LIKE :username');
    }
    const queryCondition = queryConditionList.join(' AND ');
    const [data, total] = await getConnection().createQueryBuilder(AdminUserEntity, 'user')
      .andWhere(queryCondition, { username: `%${username}%` }) // 新增条件查询
      .orderBy({ 'user.createdAt': 'DESC' }) // 排序字段及方式
      .skip((pageNumber - 1) * pageSize) // 跳过多少数据
      .take(pageSize) // 查询多少条数据
      .printSql() // 仅仅是打印sql语句,可以不写
      .getManyAndCount(); // 查询和返回条数
    return {
      data,
      total,
      pageNumber,
      pageSize,
    }
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
