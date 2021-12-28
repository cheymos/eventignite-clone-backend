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
  ): Promise<number> {
    const newPlaylist = new PlaylistEntity(name, description, userId);
    const playlist = await this.playlistRepository.save(newPlaylist);

    return playlist.id;
  }

  async getOne(playlistId: number): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOneById(playlistId);

    return playlist;
  }

  async update(
    playlistId: number,
    { name, description }: PlaylistDto,
  ): Promise<void> {
    const playlist = await this.playlistRepository.findOneById(playlistId);

    const newPlaylist = new PlaylistEntity(name, description, playlist.ownerId);
    this.playlistRepository.update({ id: playlist.id }, newPlaylist);
  }

  async delete(playlistId: number): Promise<void> {
    const playlist = await this.playlistRepository.findOneById(playlistId);

    await this.playlistRepository.delete(playlist);
  }

  checkAccess(playlist: PlaylistEntity, userId: string): void {
    const isAllow = playlist.ownerId === userId;

    if (!isAllow) throw new ForbiddenException(NO_ACCESS_PLAYLIST);
  }
}
