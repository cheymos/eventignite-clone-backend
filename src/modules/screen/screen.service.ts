import { Injectable } from '@nestjs/common';
import { ScreenDto } from './dtos/screen.dto';
import { ScreenEntity } from './entities/screen.entity';
import { ScreenRepository } from './screen.repository';

@Injectable()
export class ScreenService {
  constructor(private readonly screenRepository: ScreenRepository) {}

  async create(
    { name, description, playlistId, eventId }: ScreenDto,
    userId: string,
  ): Promise<ScreenEntity> {
    const screen = new ScreenEntity(
      name,
      description,
      eventId,
      playlistId,
      userId,
    );
    return this.screenRepository.save(screen);
  }

  async getOne(screenId: number): Promise<ScreenEntity> {
    return this.screenRepository.findOneOrException(screenId);
  }

  async update(
    screenId: number,
    { name, description, eventId, playlistId }: ScreenDto,
    userId: string,
  ): Promise<ScreenEntity> {
    const screen = await this.screenRepository.findOneOrException(screenId);

    const newScreen = new ScreenEntity(
      name,
      description,
      eventId,
      playlistId,
      userId,
    );

    Object.assign(screen, newScreen);

    return this.screenRepository.save(screen);
  }

  async delete(screenId: number, userId: string): Promise<void> {
    const screen = await this.screenRepository.findOneOrException(screenId);

    await this.screenRepository.delete(screen);
  }
}
