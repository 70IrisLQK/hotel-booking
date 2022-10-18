/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import * as _ from 'lodash';

export class HotelException extends Error {
  constructor(
    private readonly error: any,
    private readonly description?: string,
  ) {
    super();
    this.initMessage();
    this.initName();
  }

  public initMessage() {
    if (_.isString(this.error)) {
      this.message = this.error;
    } else if (this.error?.message) {
      this.message = this.error.message;
    } else if (this.constructor) {
      this.message = this.constructor.name
        .match(/[A-Z][a-z]+|[0-9]+/g)
        .join(' ');
    }
  }

  public initName() {
    this.name = this.constructor.name;
  }

  public getError(): string | object {
    return this.error;
  }

  public static createBody(objectOrError: object | string, message?: string) {
    if (!objectOrError) {
      return { message: message };
    }
    return _.isObject(objectOrError) && !Array.isArray(objectOrError)
      ? objectOrError
      : { message: objectOrError, error: message };
  }
}
