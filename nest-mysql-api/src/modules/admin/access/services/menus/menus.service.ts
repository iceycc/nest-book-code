import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { ObjectType } from '@src/types';
import { AccessEntity } from '../../entities/access.entity';
import { UsersRoleEntity } from '@src/modules/admin/users/entities/users.role.entity';
import { RoleAccessEntity } from '@src/modules/admin/role/entities/role.access.entity';
import { AdminUserEntity } from '@src/modules/admin/users/entities/users.entity';

@Injectable()
export class MenusService {
  constructor (
    @InjectRepository(AccessEntity)
    private readonly accessRepository: Repository<AccessEntity>,
  ) { }

  /**
   * @Author: 水痕
   * @Date: 2020-05-19 08:40:14
   * @LastEditors: 水痕
   * @Description: 根据当前用户的角色获取菜单
   * @param {type} 
   * @return: 
   */
  async menusList(userInfo: ObjectType): Promise<any> {
    try {
      /**
     * 根据权限判断返回菜单的主要步骤
     * 1.获取全部的菜单
     * 2.如果是超级管理员就直接全部的返回-->根据字段isSuper=1
     * 3.根据当前的用户id获取角色id-->到role_access表中获取
     * 4.遍历循环所有的权限数据,判断当前权限是否在角色权限的数组中
     */
      const { isSuper, id: userId } = userInfo;
      // 1.获取全部的菜单并且格式化
      const resultList = await this.accessRepository.createQueryBuilder('access')
        .where('access.isDel=0 and access.status=1 and access.type=1 or access.type=2')
        .getMany();
      const formatMenus = resultList.map(item => {
        const { id, moduleName, actionName, moduleId, url, sort, icon } = item;
        return {
          id,
          url,
          sort,
          icon,
          parentId: moduleId,
          name: moduleName ? moduleName : actionName,
        }
      })
      // 2.如果是超级管理员就直接全部返回
      if (Object.is(isSuper, 1)) {
        return formatMenus;
      }
      // 3.根据当前用户id关联到用户角色表，roleId到role_access表中获取全部的权限
      // const alreadySelectedAccessList = await this.roleAccessRepository.find({ where: { roleId, type: '1' } });
      const alreadySelectedAccessList: any = await getConnection().createQueryBuilder(AdminUserEntity, 'user')
        .where('(user.id=:userId and user.isDel=0)', { userId })
        .innerJoin(UsersRoleEntity, 'user_role', 'user.id=user_role.userId') // 查询到全部的角色
        .innerJoin(RoleAccessEntity, 'role_access', 'user_role.roleId=role_access.roleId and role_access.type=1') // 根据角色查询资源
        .innerJoinAndMapMany('user.access', AccessEntity, 'access', 'role_access.accessId=access.id and access.isDel=0')
        .getOne()
      if (alreadySelectedAccessList) {
        const alreadySelectedAccessIdList = alreadySelectedAccessList.access.map(item => item.id);
        return formatMenus.filter((item: ObjectType) => alreadySelectedAccessIdList.includes(item.id));
      } else {
        return [];
      }
    } catch (e) {
      console.log(e, '错误了');
      throw new HttpException('获取菜单失败', HttpStatus.OK);
    }
  }
} 
