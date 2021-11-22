import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PLAYLIST_NOT_FOUND } from '../../common/constants/error.constants';
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

  async findOne(playlistId: number): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepositoty.findOne(playlistId);

    if (!playlist) throw new NotFoundException(PLAYLIST_NOT_FOUND);

    return playlist;
  }
}
