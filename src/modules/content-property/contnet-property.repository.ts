import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { ContentPropertyEntity } from './entities/content-property.entity';

@EntityRepository(ContentPropertyEntity)
export class ContentPropertyRepository extends BaseRepository<ContentPropertyEntity> {}
