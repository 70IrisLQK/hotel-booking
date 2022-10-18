import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import _ = require('lodash');

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requirePermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    );

    if (!requirePermissions.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { roles, permissions } = request.user;

    if (roles.includes('Super Admin')) {
      return true;
    }

    return (
      _.intersection(permissions, requirePermissions).length ===
      requirePermissions.length
    );
  }
}
