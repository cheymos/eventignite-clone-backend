import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { PlaylistContentEntity } from '../entities/playlist-content.entity';

@EntityRepository(PlaylistContentEntity)
export class PlaylistContentRepository extends BaseRepository<PlaylistContentEntity> {}
