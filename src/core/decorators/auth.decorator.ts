import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from '../../database/entities';
import { AuthGuard } from '../guards/auth.guard';
import { PermissionGuard } from '../guards/permission.guard';

export function Auth(...permissions) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(AuthGuard, PermissionGuard),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export const UserAuth = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
