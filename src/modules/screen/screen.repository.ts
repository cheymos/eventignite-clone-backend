import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { ScreenEntity } from './entities/screen.entity';

@EntityRepository(ScreenEntity)
export class ScreenRepository extends BaseRepository<ScreenEntity> {}
