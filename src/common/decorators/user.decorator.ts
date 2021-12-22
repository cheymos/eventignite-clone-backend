import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '../../modules/auth/types/token-payload.type';
import { ModifyExpressRequest } from '../types/modify-express-request.type';

export const User = createParamDecorator(
  (data: keyof TokenPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ModifyExpressRequest>();

    if (!request.user) return null;

    const { user } = request;

    return data ? user?.[data] : user;
  },
);
