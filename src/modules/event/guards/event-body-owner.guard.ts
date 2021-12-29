import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {
  EVENT_NOT_FOUND,
  NO_ACCESS_EVENT
} from '../../../common/constants/error.constants';
import { InvalidFieldsException } from '../../../common/exceptions/invalid-fields.exception';
import { ModifyExpressRequest } from '../../../common/types/modify-express-request.type';
import { EventRepository } from '../event.repository';

@Injectable()
export class EventBodyOwnerGuard implements CanActivate {
  constructor(private readonly eventRepository: EventRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ModifyExpressRequest>();
    const userId = request.user?.sub;

    const { eventId } = request.body;

    const event = await this.eventRepository.findOne(eventId);

    if (!event)
      throw new InvalidFieldsException({
        eventId: [EVENT_NOT_FOUND],
      });

    if (event.ownerId !== userId)
      throw new InvalidFieldsException({
        eventId: [NO_ACCESS_EVENT],
      });

    return true;
  }
}
