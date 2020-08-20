import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { getManager, EntityManager, getConnection } from 'typeorm';
import { AssignAccessDto } from '../../controllers/role-access/dto/assign_access.dto';
import { RoleAccessEntity } from '../../entities/role.access.entity';
import { AccessEntity } from '@src/modules/admin/access/entities/access.entity';


@Injectable()
export class RoleAccessService {

  /**
   * @Author: 水痕
   * @Date: 2020-05-19 07:57:14
   * @LastEditors: 水痕
   * @Description: 给角色分配资源
   * @param {type} 
   * @return: 
   */
  async assignAccess(data: AssignAccessDto): Promise<any> {
    const { roleId, accessList, type } = data;
    /**
     * 1.先将表中roleId的删除
     * 2.重新插入数据
     */
    return getManager()
      .transaction(async (entityManager: EntityManager) => {
        await entityManager.delete(RoleAccessEntity, { roleId: Number(roleId), type: type });
        for (const item of accessList) {
          await entityManager.save(RoleAccessEntity, { roleId: roleId, accessId: Number(item), type: String(type) });
        }
      }).then(async () => {
        return '分配资源成功';
      }).catch((e) => {
        Logger.error('角色分配资源错误', e);
        throw new HttpException('角色分配资源错误', HttpStatus.OK);
      });
  }

	/**
  * @Author: 水痕
  * @Date: 2020-05-19 08:29:21
  * @LastEditors: 水痕
  * @Description: 根据当前的角色及类型获取已经授权的资源
  * @param {type} 
  * @return: 
  */
  async authorizationList(type: number, roleId: number): Promise<any> {
    // 获取已经设置的权限
    const alreadyAccessList = await getConnection().createQueryBuilder(RoleAccessEntity, 'rc')
      .andWhere('(rc.type= :type and rc.roleId=:roleId)', { type, roleId })
      .select(['rc.accessId'])
      .getMany()
    // 提取全部的id
    const alreadyAccessIdList = alreadyAccessList.map(item => item.accessId);
    if (Object.is(type, 1)) {
      // 请求菜单权限
      const result = await getConnection().createQueryBuilder(AccessEntity, 'ac')
        .andWhere('ac.isDel=0 and ac.status=1 and ac.type=1 or ac.type=2')
        .select(['ac.id', 'ac.moduleName', 'ac.actionName', 'ac.moduleId'])
        .getMany();
      return result.map((item: any) => {
        return {
          id: item.id,
          title: item.moduleName ? item.moduleName : item.actionName,
          parentId: item.moduleId,
          direction: alreadyAccessIdList.includes(item.id) ? 'right' : 'left',
        }
      })
    } else if (Object.is(type, 2)) {
      // 请求接口的权限
      const result = await getConnection().createQueryBuilder(AccessEntity, 'ac')
        .andWhere('ac.isDel=0 and ac.status=1 and ac.type=2 or ac.type=3')
        .select(['ac.id', 'ac.moduleName', 'ac.type', 'ac.actionName', 'ac.moduleId'])
        .getMany();
      return result.map((item: any) => {
        return {
          id: item.id,
          title: item.moduleName ? item.moduleName : item.actionName,
          parentId: item.type == 2 ? 0 : item.moduleId,
          direction: alreadyAccessIdList.includes(item.id) ? 'right' : 'left',
        }
      })
    } else {
      throw new HttpException(`传统的参数有错误,只能传递1或2,你传递的是:${type}`, HttpStatus.OK);
    }
  }
}
