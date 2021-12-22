import {
    ForbiddenException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    NO_ACCESS_PLAYLIST,
    PLAYLIST_NOT_FOUND
} from '../../../common/constants/error.constants';
import { PlaylistDto } from '../dtos/playlist.dto';
import { PlaylistEntity } from '../entities/playlist.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepositoty: Repository<PlaylistEntity>,
  ) {}

  async create(
    { name, description }: PlaylistDto,
    userId: string,
  ): Promise<number> {
    const newPlaylist = new PlaylistEntity(name, description, userId);
    const playlist = await this.playlistRepositoty.save(newPlaylist);

    return playlist.id;
  }

  async getOne(playlistId: number, userId: string): Promise<PlaylistEntity> {
    const playlist = await this.findOne(playlistId);
    this.checkAccess(playlist, userId);

    return playlist;
  }

  async update(
    playlistId: number,
    { name, description }: PlaylistDto,
    userId: string,
  ): Promise<void> {
    const playlist = await this.findOne(playlistId);
    this.checkAccess(playlist, userId);

    const newPlaylist = new PlaylistEntity(name, description, userId);
    this.playlistRepositoty.update({ id: playlist.id }, newPlaylist);
  }

  async delete(playlistId: number, userId: string): Promise<void> {
    const playlist = await this.findOne(playlistId);
    this.checkAccess(playlist, userId);

    await this.playlistRepositoty.delete({ id: playlistId });
  }

  checkAccess(playlist: PlaylistEntity, userId: string): void {
    const isAllow = playlist.ownerId === userId;

    if (!isAllow) throw new ForbiddenException(NO_ACCESS_PLAYLIST);
  }

  async findOne(
    playlistId: number,
    relations?: [string],
  ): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepositoty.findOne(playlistId, {
      relations,
    });

    if (!playlist) throw new NotFoundException(PLAYLIST_NOT_FOUND);

    return playlist;
  }
}
