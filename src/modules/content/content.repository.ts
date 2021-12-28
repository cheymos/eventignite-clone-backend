import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { ContentEntity } from './entities/content.entity';

@EntityRepository(ContentEntity)
export class ContentRepository extends BaseRepository<ContentEntity> {}
