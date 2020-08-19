import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, EntityManager } from 'typeorm';

import { RoleEntity } from '@src/modules/admin/role/entities/role.entity';
import { AssignRoleDto } from '../../controllers/users-role/dto/assign_role.dto';
import { UsersRoleEntity } from '../../entities/users.role.entity';
import { ObjectType } from '@src/types';


@Injectable()
export class UsersRoleService {
  constructor (
    @InjectRepository(UsersRoleEntity)
    private readonly userRoleRepository: Repository<UsersRoleEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) { }

  /**
   * @Author: 水痕
   * @Date: 2020-05-18 17:04:04
   * @LastEditors: 水痕
   * @Description: 获取角色树
   * @param {type} 
   * @return: 
   */
  async roleTree(userId: number): Promise<any> {
    // 获取已经设置的角色
    const alreadyRoleList = await this.userRoleRepository.find({ where: { userId }, select: ['roleId'] });
    // 提取全部的id
    const alreadyRoleIdList = alreadyRoleList.map(item => item.roleId);
    // 获取全部的角色
    const result = await this.roleRepository.find({ where: { isDel: 0 } });
    return result.map((item: ObjectType) => {
      return {
        id: item.id,
        key: item.id.toString(),
        title: item.title,
        direction: alreadyRoleIdList.includes(item.id) ? 'right' : 'left',
      }
    })
  }

  async assignRole(data: AssignRoleDto): Promise<any> {
    const { userId, roleList } = data;
    /**
     * 1.先将表中userId的删除
     * 2.重新插入数据
     */
    return getManager()
      .transaction(async (entityManager: EntityManager) => {
        await entityManager.delete(UsersRoleEntity, { userId: Number(userId) })
        for (const item of roleList) {
          await entityManager.save(UsersRoleEntity, { userId, roleId: Number(item) })
        }
      }).then(async () => {
        return '成功';
      }).catch((e) => {
        Logger.error('用户分配角色错误', e);
        throw new HttpException('用户分配角色错误', HttpStatus.OK);
      });
  }
}
