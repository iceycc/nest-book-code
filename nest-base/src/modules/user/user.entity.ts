import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, BeforeInsert } from "typeorm";
import { Exclude, Expose } from 'class-transformer';
import * as jwt from 'jsonwebtoken';
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
    this.password = this.nodeAuth.makePassword(this.password);
  }

  @Expose()
  private get token() {
    const { id, username, } = this;
    // 生成签名
    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET, // 加盐
      {
        expiresIn: '7d', // 过期时间
      },
    );
  }

  /**
   * @Author: 水痕
   * @Date: 2020-08-05 08:47:38
   * @LastEditors: 水痕
   * @Description: 定义返回数据,用了这个函数后上面的Exclude和Expose就失效了
   * @param {type} 
   * @return {type} 
   */
  public toResponseObject(isShowToken = true): { [propsName: string]: any } {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { nodeAuth, password, token, username, ...params } = this;
    const responseData = {
      username,
      ...params,
    }
    if (isShowToken) {
      return Object.assign(responseData, { token });
    } else {
      return responseData;
    }
  }
}


