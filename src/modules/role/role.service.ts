import { RoleException } from './../../common/exceptions/role.exceptions';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { RoleRepository } from './role.repository';
import { RolePermissionRepository } from '../role-permission/role-permission.repository';
import { PermissionRepository } from '../permission/permission.repository';
import * as _ from 'lodash';
@Injectable()
export class RoleService {
  constructor(
    private roleRepository: RoleRepository,
    private rolePermissionRepository: RolePermissionRepository,
    private permissionRepository: PermissionRepository,
  ) {}

  public async createRole(payload: CreateRoleDto) {
    const { name, permissionIds } = payload;

    const checkRole = await this.roleRepository.findOne({
      where: {
        name: name,
      },
    });

    if (checkRole) throw new RoleException('ROLE_EXIST', HttpStatus.CONFLICT);

    const savedRole = await this.roleRepository.save({
      name: name,
    });

    Promise.all(
      _.map(permissionIds, async (permissionId) => {
        const permission = await this.permissionRepository.findOne({
          id: permissionId,
        });

        await this.rolePermissionRepository.save({
          role: savedRole,
          permission: permission,
        });
      }),
    );

    return { status: 'success', statusCode: '201', data: savedRole };
  }

  public async deleteRole(roleId: string) {
    const role = await this.roleRepository.findOne(roleId);

    if (role && role.name === 'Super Admin')
      throw new RoleException(
        'CANNOT_DELETE_ADMIN_ROLE',
        HttpStatus.BAD_REQUEST,
      );
    const deletedRole = await this.roleRepository.softDelete(roleId);
    if (!deletedRole.affected) {
      throw new RoleException('NOT_FOUND_ROLE', HttpStatus.NOT_FOUND);
    }

    const result = await this.roleRepository.findOne(roleId, {
      withDeleted: true,
    });
    return { status: 'success', statusCode: '200', data: result };
  }

  public async updateRole(id: string, payload: UpdateRoleDto) {
    const { name, permissionIds } = payload;

    const role = await this.roleRepository.findOne(id, {
      relations: ['userRoles', 'rolePermissions'],
    });

    if (role.name === 'super admin') {
      throw new RoleException(
        'CANNOT_UPDATE_ADMIN_ROLE',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.roleRepository.update(id, {
      name: name || role.name,
    });

    await this.rolePermissionRepository.delete({ role: role });

    Promise.all(
      _.map(permissionIds, async (permissionId) => {
        const permission = await this.permissionRepository.findOne({
          id: permissionId,
        });

        await this.rolePermissionRepository.save({
          role: role,
          permission: permission,
        });
      }),
    );

    return { status: 'success', statusCode: '200', data: role };
  }
}
