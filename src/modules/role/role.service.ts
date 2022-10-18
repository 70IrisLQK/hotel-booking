import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './role.dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  public async createRole(payload: CreateRoleDto) {
    const newRole = await this.roleRepository.save({
      name: payload.name,
    });
    return { status: 'success', status_code: '201', data: newRole };
  }

  public async deleteRole(roleId: string) {
    const role = await this.roleRepository.findOne(roleId);

    if (role && role.name === 'Super Admin')
      throw new BadRequestException('Cannot delete Admin role');

    const deletedRole = await this.roleRepository.softDelete(roleId);
    if (!deletedRole.affected) {
      throw new NotFoundException('NOT_FOUND_ROLE');
    }

    const result = await this.roleRepository.findOne(roleId, {
      withDeleted: true,
    });
    return { status: 'success', status_code: '200', data: result };
  }
}
