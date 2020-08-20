import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('role_access')
export class RoleAccessEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id'
  })
  id: number;

  @Column('int', {
    nullable: true,
    name: 'role_id',
    comment: '角色id'
  })
  roleId: number;


  @Column('int', {
    nullable: true,
    name: 'access_id',
    comment: '资源id'
  })
  accessId: number;


  @Column('varchar', {
    nullable: true,
    length: 10,
    name: 'type',
    comment: '类型,type=1表示菜单,type=2表示接口'
  })
  type: string | null;

}
