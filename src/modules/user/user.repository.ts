import { User } from './../../database/entities/user.entity';
import { Repository, EntityRepository } from 'typeorm';
import * as _ from 'lodash';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUserRoleById(
    userId,
  ): Promise<{ roles: string[]; permissions: string[] }> {
    const user = await this.findOne({
      where: {
        id: userId,
      },
      relations: [
        'userRoles',
        'userRoles.role',
        'userRoles.role.rolePermissions',
        'userRoles.role.rolePermissions.permission',
      ],
    });

    const { userRoles } = user;
    const permissions = [];
    const roles = _.map(userRoles, (userRole) => {
      const rolePermissions = _.map(
        userRole.role.rolePermissions,
        (rolePermission) => rolePermission.permission.name,
      );
      permissions.push(rolePermissions);
      return userRole.role.name;
    });

    return {
      roles,
      permissions: _.intersection(...permissions),
    };
  }
}
