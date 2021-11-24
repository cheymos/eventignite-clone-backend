import { ApiProperty } from '@nestjs/swagger';
import { TokenPayload } from './token-payload.type';

export class LoginResponse {
  @ApiProperty()
  user: TokenPayload;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
