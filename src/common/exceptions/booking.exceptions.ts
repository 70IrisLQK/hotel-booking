import { HttpException } from '@nestjs/common';

export class BookingException extends HttpException {
  constructor(msg: string, status: number) {
    super(msg, status);
  }
}
