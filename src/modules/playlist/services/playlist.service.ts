import { ForbiddenException, Injectable } from '@nestjs/common';
import { NO_ACCESS_PLAYLIST } from '../../../common/constants/error.constants';
import { PlaylistDto } from '../dtos/playlist.dto';
import { PlaylistEntity } from '../entities/playlist.entity';
import { PlaylistRepository } from '../repositories/playlist.repository';

@Injectable()
export class PlaylistService {
  constructor(private readonly playlistRepository: PlaylistRepository) {}

  async create(
    { name, description }: PlaylistDto,
    userId: string,
  ): Promise<PlaylistEntity> {
    const newPlaylist = new PlaylistEntity(name, description, userId);
    return this.playlistRepository.save(newPlaylist);
  }

  async getOne(playlistId: number): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOneOrException(
      playlistId,
    );

    return playlist;
  }

  async update(
    playlistId: number,
    { name, description }: PlaylistDto,
  ): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOneOrException(
      playlistId,
    );
    const newPlaylist = new PlaylistEntity(name, description, playlist.ownerId);

    Object.assign(playlist, newPlaylist);

    return this.playlistRepository.save(playlist);
  }

  async delete(playlistId: number): Promise<void> {
    const playlist = await this.playlistRepository.findOneOrException(
      playlistId,
    );

    await this.playlistRepository.delete(playlist);
  }

  checkAccess(playlist: PlaylistEntity, userId: string): void {
    const isAllow = playlist.ownerId === userId;

    if (!isAllow) throw new ForbiddenException(NO_ACCESS_PLAYLIST);
  }
}
