import { forwardRef, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ModifyExpressRequest } from '../../../common/types/modify-express-request.type';
import { TokenService } from '../token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(forwardRef(() => TokenService))
    private readonly refreshTokenService: TokenService,
  ) {}

  use(req: ModifyExpressRequest, _: any, next: () => void) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      next();
      return;
    }

    const accessToken = authorizationHeader.split(' ')[1];
    const userPayload = this.refreshTokenService.validateToken(
      'ACCESS',
      accessToken,
    );

    if (!userPayload) {
      next();
      return;
    }

    req.userPayload = userPayload;

    next();
    return;
  }
}
