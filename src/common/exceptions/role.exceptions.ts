import { HttpException } from '@nestjs/common';

export class RoleException extends HttpException {
  constructor(msg: string, status: number) {
    super(msg, status);
  }
}
