import {
  Injectable, UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PLAYLIST_IS_USED
} from '../../common/constants/error.constants';
import { EventService } from '../event/event.service';
import { PlaylistService } from '../playlist/playlist.service';
import { ScreenDto } from './dtos/screen.dto';
import { ScreenEntity } from './entities/screen.entity';

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(ScreenEntity)
    private readonly screenRepository: Repository<ScreenEntity>,
    private readonly eventService: EventService,
    private readonly playlstService: PlaylistService,
  ) {}

  async create(
    { name, description, playlistId, eventId }: ScreenDto,
    userId: number,
  ): Promise<number> {
    try {
      const event = await this.eventService.findOne(eventId);
      const playlist = await this.playlstService.findOne(playlistId, [
        'screen',
      ]);

      if (playlist.screen)
        throw new UnprocessableEntityException(PLAYLIST_IS_USED);

      this.playlstService.checkAccess(playlist, userId);
      this.eventService.checkAccess(event, userId);

      const screen = new ScreenEntity(
        name,
        description,
        eventId,
        playlistId,
        userId,
      );
      const { id } = await this.screenRepository.save(screen);

      return id;
    } catch (err: any) {
      throw new UnprocessableEntityException(err.message);
    }
  }
}
