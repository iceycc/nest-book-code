import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('admin_user')// 可能有前端的用户表,看情况区分
export class AdminUserEntity extends BaseEntity {
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
}