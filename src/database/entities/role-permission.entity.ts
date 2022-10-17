import { AbstractEntity } from 'src/common/abstract/entity.abstract';
import { Entity, JoinTable, ManyToOne } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
@Entity('m_role_permission')
export class RolePermission extends AbstractEntity {
  @ManyToOne(() => Role, (role) => role.rolePermissions)
  @JoinTable()
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
  @JoinTable()
  permission: Permission;
}
