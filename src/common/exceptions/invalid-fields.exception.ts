import { UnprocessableEntityException } from '@nestjs/common';

export type Errors<T> = {
  [key in keyof T]?: string[];
};

export class InvalidFieldsException extends UnprocessableEntityException {
  constructor(errors: Errors<any>) {
    super({ errors });
  }
}
