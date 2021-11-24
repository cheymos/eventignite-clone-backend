import { ApiProperty } from '@nestjs/swagger';

export class PaginateResponse<T> {
  @ApiProperty()
  data: T[];
  @ApiProperty()
  total: number;
}
