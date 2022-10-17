import { RolePermission } from './role-permission.entity';
import { AbstractEntity } from 'src/common/abstract/entity.abstract';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';
@Entity('t_role')
export class Role extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];
}
