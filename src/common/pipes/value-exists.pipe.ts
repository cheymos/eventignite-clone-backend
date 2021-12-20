import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException
} from '@nestjs/common';

@Injectable()
export class ValueExistsPipe implements PipeTransform {
  constructor(private readonly errorMessage: string) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) throw new UnprocessableEntityException(this.errorMessage);

    return value;
  }
}
