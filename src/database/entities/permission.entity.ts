import { AbstractEntity } from 'src/common/abstract/entity.abstract';
import { Column, Entity, OneToMany } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Entity('t_permission')
export class Permission extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  rolePermissions: RolePermission[];
}
