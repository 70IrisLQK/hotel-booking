import { HttpException } from '@nestjs/common';

export class AuthException extends HttpException {
  constructor(msg: string, status: number) {
    super(msg, status);
  }
}
