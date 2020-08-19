import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';


@Entity('admin_user_role')
export class UsersRoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id'
  })
  id: number;

  @Column('int', {
    nullable: false,
    name: 'user_id',
    comment: '用户id'
  })
  userId: number;


  @Column('int', {
    nullable: false,
    name: 'role_id',
    comment: '角色id'
  })
  roleId: number;

}
