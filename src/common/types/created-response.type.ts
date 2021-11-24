import { ApiProperty } from '@nestjs/swagger';

export class CreatedResponse {
  @ApiProperty()
  id: number;
}
