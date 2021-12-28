import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { PlaylistEntity } from '../entities/playlist.entity';

@EntityRepository(PlaylistEntity)
export class PlaylistRepository extends BaseRepository<PlaylistEntity> {}
