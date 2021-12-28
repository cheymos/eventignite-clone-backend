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
  ): Promise<number> {
    const event = new EventEntity(name, description, userId);
    const createdEvent = await this.eventRepository.save(event);

    return createdEvent.id;
  }

  async getOne(eventId: number, userId: string): Promise<EventEntity> {
    const event = await this.eventRepository.findOneById(eventId);
    this.checkAccess(event, userId);

    return event;
  }

  async update(
    eventId: number,
    { name, description }: EventDto,
    userId: string,
  ): Promise<void> {
    const event = await this.eventRepository.findOneById(eventId);
    this.checkAccess(event, userId);

    const newEvent = new EventEntity(name, description, userId);
    this.eventRepository.update({ id: event.id }, newEvent);
  }

  async delete(eventId: number, userId: string): Promise<void> {
    const event = await this.eventRepository.findOneById(eventId);
    this.checkAccess(event, userId);

    await this.eventRepository.delete({ id: eventId });
  }

  checkAccess(event: EventEntity, userId: string): void {
    const isAllow = event.ownerId === userId;

    if (!isAllow) throw new ForbiddenException(NO_ACCESS_EVENT);
  }
}
