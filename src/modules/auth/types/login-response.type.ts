import { TokenPayload } from './token-payload.type';

export class LoginResponse {
  user: TokenPayload;
  accessToken: string;
  refreshToken: string;
}
