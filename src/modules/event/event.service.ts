import { Injectable } from '@nestjs/common';
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
}
