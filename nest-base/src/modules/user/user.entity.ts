import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, BeforeInsert } from "typeorm";
import { Exclude, Expose } from 'class-transformer';
import NodeAuth from 'node-auth0';

@Entity({ name: 'user' })
export class UserEntity {
  @Exclude()
  private nodeAuth: NodeAuth;

  constructor () {
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
    nullable: false,
    length: 50,
    unique: true,
    name: 'username',
    comment: '用户名'
  })
  username: string;

  @Exclude() // 排除返回字段,不返回给前端
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    comment: '密码'
  })
  password: string;

  @Column('tinyint', {
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

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updateAt: Date;

  @Expose()
  isDelStr(): string {
    return this.isDel ? '删除' : '正常'
  }

  @BeforeInsert()
  makePassword(): void {
    console.log(this.nodeAuth.makePassword(this.password), '???密码加密了')
    this.password = this.nodeAuth.makePassword(this.password);
  }
}


