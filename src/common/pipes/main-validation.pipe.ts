import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
  ValidationError
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Errors } from '../exceptions/invalid-fields.exception';

@Injectable()
export class MainValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length === 0) return value;

    throw new HttpException(
      { errors: this.formattingErrors(errors) },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  formattingErrors(errors: ValidationError[]) {
    return errors.reduce((acc, err) => {
      acc[err.property] = Object.values(err.constraints as any);

      return acc;
    }, {} as Errors<any>);
  }
}
