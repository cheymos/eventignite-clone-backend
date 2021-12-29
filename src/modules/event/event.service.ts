import { ForbiddenException, Injectable } from '@nestjs/common';
import { NO_ACCESS_EVENT } from '../../common/constants/error.constants';
import { EventDto } from './dtos/event.dto';
import { EventEntity } from './entities/event.entity';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async create(
    { name, description }: EventDto,
    userId: string,
  ): Promise<EventEntity> {
    const event = new EventEntity(name, description, userId);
    return this.eventRepository.save(event);
  }

  async getOne(eventId: number): Promise<EventEntity> {
    const event = await this.eventRepository.findOneOrException(eventId);

    return event;
  }

  async update(
    eventId: number,
    { name, description }: EventDto,
  ): Promise<EventEntity> {
    const event = await this.eventRepository.findOneOrException(eventId);

    const newEvent = new EventEntity(name, description, event.ownerId);

    Object.assign(event, newEvent);

    return this.eventRepository.save(event);
  }

  async delete(eventId: number): Promise<void> {
    await this.eventRepository.delete({ id: eventId });
  }

  checkAccess(event: EventEntity, userId: string): void {
    const isAllow = event.ownerId === userId;

    if (!isAllow) throw new ForbiddenException(NO_ACCESS_EVENT);
  }
}
