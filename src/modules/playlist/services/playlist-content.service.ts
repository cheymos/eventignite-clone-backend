import { Injectable } from '@nestjs/common';
import { PaginateResponse } from '../../../common/types/paginate-response.type';
import { PlaylistContentDto } from '../dtos/playlist-content.dto';
import { PlaylistContentEntity } from '../entities/playlist-content.entity';
import { PlaylistContentRepository } from '../repositories/playlist-content.repository';

@Injectable()
export class PlaylistContentService {
  constructor(
    private readonly playlistContentRepository: PlaylistContentRepository,
  ) {}

  async addContentToPlaylist(
    { contentId, duration, pos }: PlaylistContentDto,
    playlistId: number,
  ): Promise<PlaylistContentEntity> {
    const newPlaylistContent = new PlaylistContentEntity(
      playlistId,
      contentId,
      pos,
      duration,
    );
    return await this.playlistContentRepository.save(newPlaylistContent);
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
  ): Promise<PlaylistContentEntity> {
    const playlistContent =
      await this.playlistContentRepository.findOneOrException(
        playlistContentId,
      );

    const newPlaylistContent = new PlaylistContentEntity(
      playlistId,
      contentId,
      pos,
      duration,
    );

    Object.assign(playlistContent, newPlaylistContent);

    return this.playlistContentRepository.save(playlistContent);
  }

  async deleteContentFromPlaylist(playlistContentId: number): Promise<void> {
    const playlistContent =
      await this.playlistContentRepository.findOneOrException(
        playlistContentId,
      );

    await this.playlistContentRepository.delete(playlistContent);
  }
}
