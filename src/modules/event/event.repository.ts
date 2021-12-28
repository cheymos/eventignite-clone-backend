import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { EventEntity } from './entities/event.entity';

@EntityRepository(EventEntity)
export class EventRepository extends BaseRepository<EventEntity> {}
