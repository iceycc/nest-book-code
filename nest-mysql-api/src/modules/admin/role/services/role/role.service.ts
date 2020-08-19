import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { ToolsService } from '@src/services/tools/tools.service';
import { ObjectType } from '@src/types';
import { RoleEntity } from '../../entities/role.entity';
import { CreateRoleDto } from '../../controllers/role/dto/create.role.dto';
import { UpdateRoleDto } from '../../controllers/role/dto/update.role.dto';

@Injectable()
export class RoleService {
  constructor (
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly toolsService: ToolsService,
  ) { }

  /**
   * @Author: 水痕
   * @Date: 2020-08-19 11:56:46
   * @LastEditors: 水痕
   * @Description: 创建角色
   * @param {type} 
   * @return {type} 
   */
  async createRole(createRoleDto: CreateRoleDto): Promise<any> {
    const { title } = createRoleDto;
    const isExists = await this.roleRepository.findOne({ where: { title, isDel: 0 } });
    if (isExists) {
      throw new HttpException(`${title}角色已经存在不能重复添加`, HttpStatus.OK);
    }
    const result = await this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(result);
  }

  /**
   * @Author: 水痕
   * @Date: 2020-08-19 11:57:01
   * @LastEditors: 水痕
   * @Description: 根据角色id删除角色
   * @param {type} 
   * @return {type} 
   */
  async deleteById(id: number): Promise<string> {
    const { raw: { affectedRows } } = await this.roleRepository.update(id, { isDel: 1 });
    if (affectedRows) {
      return '删除成功';
    } else {
      return '删除失败';
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2020-08-19 11:57:12
   * @LastEditors: 水痕
   * @Description: 根据角色id修改角色
   * @param {type} 
   * @return {type} 
   */
  async updateById(id: number, updateRoleDto: UpdateRoleDto): Promise<string> {
    const { raw: { affectedRows } } = await this.roleRepository.update({ id }, updateRoleDto);
    if (affectedRows) {
      return '修改成功';
    } else {
      return '修改失败';
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2020-08-19 11:57:20
   * @LastEditors: 水痕
   * @Description: 根据角色id查询到角色
   * @param {type} 
   * @return {type} 
   */
  async findById(id: number): Promise<any> {
    return await this.roleRepository.findOne({ id, isDel: 0 });
  }

  /**
   * @Author: 水痕
   * @Date: 2020-08-19 11:57:27
   * @LastEditors: 水痕
   * @Description: 获取角色列表
   * @param {type} 
   * @return {type} 
   */
  async roleList(queryOption: ObjectType): Promise<any> {
    const { pageSize = 10, pageNumber = 1 } = queryOption;
    this.toolsService.checkPage(pageSize, pageNumber);
    const [data, total] = await getConnection().createQueryBuilder(RoleEntity, 'role')
      .andWhere('(role.isDel = :isDel)', { isDel: 0 })
      .orderBy({ 'role.createdAt': 'DESC' })
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .printSql()
      .getManyAndCount();
    return {
      data,
      total,
      pageNumber,
      pageSize,
    }
  }
}
