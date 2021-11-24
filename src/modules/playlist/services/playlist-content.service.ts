import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateResponse } from '../../../common/types/paginate-response.type';
import { ContentService } from '../../content/content.service';
import { PlaylistContentDto } from '../dtos/playlist-content.dto';
import { PlaylistContentEntity } from '../entities/playlist-content.entity';
import { PlaylistService } from './playlist.service';

@Injectable()
export class PlaylistContentService {
  constructor(
    @InjectRepository(PlaylistContentEntity)
    private readonly playlistContentRepository: Repository<PlaylistContentEntity>,
    private readonly contentService: ContentService,
    private readonly playlistService: PlaylistService,
  ) {}

  async addContentToPlaylist(
    { contentId, duration, pos }: PlaylistContentDto,
    playlistId: number,
    userId: number,
  ): Promise<number> {
    const playlist = await this.playlistService.findOne(playlistId);
    this.playlistService.checkAccess(playlist, userId);

    try {
      const content = await this.contentService.findOne(contentId);
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
    userId: number,
  ): Promise<PaginateResponse<PlaylistContentEntity>> {
    const playlist = await this.playlistService.findOne(playlistId);
    this.playlistService.checkAccess(playlist, userId);

    const [data, total] = await this.playlistContentRepository
      .createQueryBuilder('pc')
      .select(['pc.id', 'pc.content', 'pc.pos', 'pc.duration'])
      .leftJoinAndSelect('pc.content', 'content')
      .where('pc.playlist = :id', { id: playlistId })
      .getManyAndCount();

    return { data, total };
  }
}
