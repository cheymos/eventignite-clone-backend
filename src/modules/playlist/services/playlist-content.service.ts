import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PLAYLIST_CONTENT_NOT_FOUND } from '../../../common/constants/error.constants';
import { PaginateResponse } from '../../../common/types/paginate-response.type';
import { ContentRepository } from '../../content/content.repository';
import { ContentService } from '../../content/content.service';
import { PlaylistContentDto } from '../dtos/playlist-content.dto';
import { PlaylistContentEntity } from '../entities/playlist-content.entity';
import { PlaylistRepository } from '../repositories/playlist.repository';
import { PlaylistService } from './playlist.service';

@Injectable()
export class PlaylistContentService {
  constructor(
    @InjectRepository(PlaylistContentEntity)
    private readonly playlistContentRepository: Repository<PlaylistContentEntity>,
    private readonly contentService: ContentService,
    private readonly contentRepositoy: ContentRepository,
    private readonly playlistService: PlaylistService,
    private readonly playlistRepository: PlaylistRepository,
  ) {}

  async addContentToPlaylist(
    { contentId, duration, pos }: PlaylistContentDto,
    playlistId: number,
    userId: string,
  ): Promise<number> {
    try {
      const content = await this.contentRepositoy.findOneOrException(contentId);
      this.contentService.checkAccess(content, userId);

      const newPlaylistContent = new PlaylistContentEntity(
        playlistId,
        contentId,
        pos,
        duration,
      );
      const { id } = await this.playlistContentRepository.save(
        newPlaylistContent,
      );

      return id;
    } catch (err: any) {
      throw new UnprocessableEntityException(err.message);
    }
  }

  async getPlaylistWithAllContents(
    playlistId: number,
  ): Promise<PaginateResponse<PlaylistContentEntity>> {
    const [data, total] = await this.playlistContentRepository
      .createQueryBuilder('pc')
      .select(['pc.id', 'pc.content', 'pc.pos', 'pc.duration'])
      .leftJoinAndSelect('pc.content', 'content')
      .where('pc.playlist = :id', { id: playlistId })
      .getManyAndCount();

    return { data, total };
  }

  async updateFullRelationship(
    { contentId, pos, duration }: PlaylistContentDto,
    playlistId: number,
    playlistContentId: number,
  ): Promise<void> {
    // TODO: simplify
    const playlistContent = await this.playlistContentRepository.findOne(
      playlistContentId,
    );

    if (!playlistContent)
      throw new NotFoundException(PLAYLIST_CONTENT_NOT_FOUND);

    const newPlaylistContent = new PlaylistContentEntity(
      playlistId,
      contentId,
      pos,
      duration,
    );

    await this.playlistContentRepository.update(
      { id: playlistContent.id },
      newPlaylistContent,
    );
  }

  async deleteContentFromPlaylist(
    playlistContentId: number,
  ): Promise<void> {
    const deleteResult = await this.playlistContentRepository.delete(
      playlistContentId,
    );

    if (deleteResult?.affected === 0)
      throw new NotFoundException(PLAYLIST_CONTENT_NOT_FOUND);
  }
}
