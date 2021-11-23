import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  NO_ACCESS_SCREEN,
  PLAYLIST_IS_USED,
  SCREEN_NOT_FOUND
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

  async getOne(screenId: number, userId: number): Promise<ScreenEntity> {
    const screen = await this.findOne(screenId);
    this.checkAccess(screen, userId);

    return screen;
  }

  async update(
    screenId: number,
    { name, description, eventId, playlistId }: ScreenDto,
    userId: number,
  ): Promise<void> {
    try {
      const screen = await this.findOne(screenId);
      this.checkAccess(screen, userId);

      const event = await this.eventService.findOne(eventId);
      const playlist = await this.playlstService.findOne(playlistId, [
        'screen',
      ]);

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

  checkAccess(screen: ScreenEntity, userId: number): void {
    const isAllow = screen.ownerId === userId;

    if (!isAllow) throw new ForbiddenException(NO_ACCESS_SCREEN);
  }

  async findOne(screenId: number): Promise<ScreenEntity> {
    const screen = await this.screenRepository.findOne(screenId);

    if (!screen) throw new NotFoundException(SCREEN_NOT_FOUND);

    return screen;
  }
}
