import { HotelException } from './hotel.exception';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export class AuthException extends HotelException {
  constructor(objectOrError?: string | object | any, message = 'Auth Error') {
    super(HotelException.createBody(objectOrError, message));
  }
}
