import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { ModifyExpressRequest } from '../../../common/types/modify-express-request.type';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<ModifyExpressRequest>();

    const { userPayload } = request;
    if (!userPayload) throw new UnauthorizedException();

    return true;
  }
}
