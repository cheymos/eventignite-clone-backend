import { Request } from 'express';
import { TokenPayload } from '../../modules/auth/types/token-payload.type';

export interface ModifyExpressRequest extends Request {
  user?: TokenPayload;
}
