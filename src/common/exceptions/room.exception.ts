import { HttpException } from '@nestjs/common';

export class RoomException extends HttpException {
  constructor(msg: string, status: number) {
    super(msg, status);
  }
}
