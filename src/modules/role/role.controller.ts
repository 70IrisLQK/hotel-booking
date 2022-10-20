import { PermissionEnum } from './../../common/enums/permission.enum';
import { Role } from './../../database/entities/role.entity';
import { RoleService } from './role.service';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { Auth } from '../../core/decorators';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('roles')
@ApiBearerAuth('jwt')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Auth(PermissionEnum.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: Role,
  })
  @Post('')
  public async createRole(@Body() payload: CreateRoleDto) {
    return this.roleService.createRole(payload);
  }

  @Auth(PermissionEnum.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: Role,
  })
  @Delete('/:id')
  public async deleteRole(@Param('id') roleId: string) {
    return this.roleService.deleteRole(roleId);
  }

  @Auth(PermissionEnum.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: Role,
  })
  @Put('/:id')
  public async updateRole(
    @Param('id') roleId: string,
    @Body() payload: UpdateRoleDto,
  ) {
    return this.roleService.updateRole(roleId, payload);
  }
}
