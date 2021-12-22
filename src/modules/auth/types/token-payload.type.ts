import { ApiProperty } from '@nestjs/swagger';

export class TokenPayload {
  @ApiProperty()
  sub: string;
}
