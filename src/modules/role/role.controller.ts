import { RoleService } from './role.service';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './role.dto';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('')
  public async createRole(@Body() payload: CreateRoleDto) {
    return this.roleService.createRole(payload);
  }

  @Delete('/:id')
  public async deleteRole(@Param() roleId: string) {
    return this.roleService.deleteRole(roleId);
  }
}
