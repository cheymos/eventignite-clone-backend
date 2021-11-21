import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventDto } from './dtos/event.dto';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async create(
    { name, description }: EventDto,
    userId: number,
  ): Promise<number> {
    const event = new EventEntity(name, description, userId);
    const createdEvent = await this.eventRepository.save(event);

    return createdEvent.id;
  }

  async getOne(eventId: number, userId: number): Promise<EventEntity> {
    const event = await this.findOne(eventId);
    this.checkAccess(event, userId);

    return event;
  }

  async update(
    eventId: number,
    { name, description }: EventDto,
    userId: number,
  ): Promise<void> {
    const event = await this.findOne(eventId);
    this.checkAccess(event, userId);

    const newEvent = new EventEntity(name, description, userId);
    this.eventRepository.update({ id: event.id }, newEvent);
  }

  async delete(eventId: number, userId: number): Promise<void> {
    const event = await this.findOne(eventId);
    this.checkAccess(event, userId);

    await this.eventRepository.delete({ id: eventId });
  }

  checkAccess(event: EventEntity, userId: number): void {
    const isAllow = event.ownerId === userId;

    if (!isAllow) throw new ForbiddenException();
  }

  async findOne(eventId: number): Promise<EventEntity> {
    const event = await this.eventRepository.findOne(eventId);

    if (!event) throw new NotFoundException();

    return event;
  }
}
