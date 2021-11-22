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
} from '../../common/constants/error.constants';
import { PlaylistDto } from './dtos/playlist.dto';
import { PlaylistEntity } from './entities/playlist.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepositoty: Repository<PlaylistEntity>,
  ) {}

  async create(
    { name, description }: PlaylistDto,
    userId: number,
  ): Promise<number> {
    const newPlaylist = new PlaylistEntity(name, description, userId);
    const playlist = await this.playlistRepositoty.save(newPlaylist);

    return playlist.id;
  }

  async getOne(playlistId: number, userId: number): Promise<PlaylistEntity> {
    const playlist = await this.findOne(playlistId);
    this.checkAccess(playlist, userId);

    return playlist;
  }

  checkAccess(playlist: PlaylistEntity, userId: number): void {
    const isAllow = playlist.ownerId === userId;

    if (!isAllow) throw new ForbiddenException(NO_ACCESS_PLAYLIST);
  }

  async findOne(playlistId: number): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepositoty.findOne(playlistId);

    if (!playlist) throw new NotFoundException(PLAYLIST_NOT_FOUND);

    return playlist;
  }
}
