import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';
import NodeAuth from 'node-auth0';
import { ObjectType } from '@src/types';

@Entity('admin_user')// 可能有前端的用户表,看情况区分
@Unique('username_is_del', ['username', 'isDel'])
export class AdminUserEntity extends BaseEntity {
  // 在实体类中定义的字段都会默认返回给前端,加上这个就表示不返回给客户端
  @Exclude()
  private nodeAuth: NodeAuth;

  constructor () {
    super()
    this.nodeAuth = new NodeAuth();
  }
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id'
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'username',
    nullable: false,
    comment: '用户名'
  })
  username: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 100,
    name: 'password',
    nullable: false,
    comment: '密码'
  })
  password: string;

  @Exclude() // 表示排除不返回这个字段,但是仅仅是针对于直接返回,如果你对齐进行数据操作后就不可以
  @Column({
    type: 'tinyint',
    nullable: false,
    default: () => 0,
    name: 'is_del',
    comment: '是否删除,1表示删除,0表示正常'
  })
  isDel: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: '创建时间'
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date;

  // 使用typeorm的钩子函数在插入数据的时候就进行加密处理
  @BeforeInsert()
  makePassword() {
    this.password = this.nodeAuth.makePassword(this.password);
  }

  /**
   * @Author: 水痕
   * @Date: 2020-08-14 12:18:27
   * @LastEditors: 水痕
   * @Description: 定义返回数据,将密码及nodeAuth过滤出来
   * @param {type} 
   * @return {type} 
   */
  public get toResponseObject(): ObjectType {
    const { nodeAuth, password, isDel, ...params } = this;
    return params;
  }
}