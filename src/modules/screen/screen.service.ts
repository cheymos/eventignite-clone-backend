import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException
} from '@nestjs/common';
import {
  NO_ACCESS_SCREEN,
  PLAYLIST_IS_USED
} from '../../common/constants/error.constants';
import { EventRepository } from '../event/event.repository';
import { EventService } from '../event/event.service';
import { PlaylistRepository } from '../playlist/repositories/playlist.repository';
import { PlaylistService } from '../playlist/services/playlist.service';
import { ScreenDto } from './dtos/screen.dto';
import { ScreenEntity } from './entities/screen.entity';
import { ScreenRepository } from './screen.repository';

@Injectable()
export class ScreenService {
  constructor(
    private readonly screenRepository: ScreenRepository,
    private readonly eventService: EventService,
    private readonly eventRepository: EventRepository,
    private readonly playlstService: PlaylistService,
    private readonly playlistRepository: PlaylistRepository,
  ) {}

  async create(
    { name, description, playlistId, eventId }: ScreenDto,
    userId: string,
  ): Promise<number> {
    try {
      const event = await this.eventRepository.findOneById(eventId);
      const playlist = await this.playlistRepository.findOneById(playlistId);

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

  async getOne(screenId: number, userId: string): Promise<ScreenEntity> {
    const screen = await this.screenRepository.findOneById(screenId);
    this.checkAccess(screen, userId);

    return screen;
  }

  async update(
    screenId: number,
    { name, description, eventId, playlistId }: ScreenDto,
    userId: string,
  ): Promise<void> {
    try {
      const screen = await this.screenRepository.findOneById(screenId);
      this.checkAccess(screen, userId);

      const event = await this.eventRepository.findOneById(eventId);
      const playlist = await this.playlistRepository.findOneById(playlistId);

      if (playlist.screen && playlist.screen.id !== screenId)
        throw new UnprocessableEntityException(PLAYLIST_IS_USED);

      this.playlstService.checkAccess(playlist, userId);
      this.eventService.checkAccess(event, userId);

      const newScreen = new ScreenEntity(
        name,
        description,
        eventId,
        playlistId,
        userId,
      );
      await this.screenRepository.update({ id: screenId }, newScreen);
    } catch (err: any) {
      throw new UnprocessableEntityException(err.message);
    }
  }

  async delete(screenId: number, userId: string): Promise<void> {
    const screen = await this.screenRepository.findOneById(screenId);
    this.checkAccess(screen, userId);

    await this.screenRepository.delete({ id: screenId });
  }

  checkAccess(screen: ScreenEntity, userId: string): void {
    const isAllow = screen.ownerId === userId;

    if (!isAllow) throw new ForbiddenException(NO_ACCESS_SCREEN);
  }
}
