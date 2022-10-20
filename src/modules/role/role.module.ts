import { RolePermissionRepository } from './../role-permission/role-permission.repository';
import { RoleRepository } from './role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { PermissionRepository } from '../permission/permission.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleRepository,
      RolePermissionRepository,
      PermissionRepository,
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
