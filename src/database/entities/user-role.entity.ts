import { Role } from './role.entity';
import { AbstractEntity } from 'src/common/abstract/entity.abstract';
import { Entity, JoinTable, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('m_user_role')
export class UserRole extends AbstractEntity {
  @ManyToOne(() => Role, (role) => role.userRoles)
  @JoinTable()
  role: Role;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinTable()
  user: User;
}
