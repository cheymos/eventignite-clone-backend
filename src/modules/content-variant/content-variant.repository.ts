import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { ContentVariantEntity } from './entities/content-variant.entity';

@EntityRepository(ContentVariantEntity)
export class ContentVariantRepository extends BaseRepository<ContentVariantEntity> {}
