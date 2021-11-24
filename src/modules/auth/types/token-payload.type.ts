import { ApiProperty } from '@nestjs/swagger';

export class TokenPayload {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;
}
