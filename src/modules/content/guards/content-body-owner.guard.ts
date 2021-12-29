import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {
  CONTENT_NOT_FOUND,
  NO_ACCESS_CONTENT
} from '../../../common/constants/error.constants';
import { InvalidFieldsException } from '../../../common/exceptions/invalid-fields.exception';
import { ModifyExpressRequest } from '../../../common/types/modify-express-request.type';
import { ContentRepository } from '../content.repository';

@Injectable()
export class ContentBodyOwnerGuard implements CanActivate {
  constructor(private readonly contentRepository: ContentRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ModifyExpressRequest>();
    const userId = request.user?.sub;

    const { contentId } = request.body;

    const content = await this.contentRepository.findOne(contentId);

    if (!content)
      throw new InvalidFieldsException({
        contentId: [CONTENT_NOT_FOUND],
      });

    if (content.ownerId !== userId)
      throw new InvalidFieldsException({
        contentId: [NO_ACCESS_CONTENT],
      });

    return true;
  }
}
