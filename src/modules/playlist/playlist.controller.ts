import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { CreatedResponse } from '../../common/types/created-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { PlaylistDto } from './dtos/playlist.dto';
import { PlaylistEntity } from './entities/playlist.entity';
import { PlaylistService } from './playlist.service';

@Controller('playlists')
@UseGuards(AuthGuard)
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  async createPlaylist(
    @Body() playlistDto: PlaylistDto,
    @User('id') userId: number,
  ): Promise<CreatedResponse> {
    const playlistId = await this.playlistService.create(playlistDto, userId);

    return { id: playlistId };
  }

  @Get(':id')
  async getPlaylist(
    @Param('id') playlistId: number,
    @User('id') userId: number,
  ): Promise<PlaylistEntity> {
    return this.playlistService.getOne(playlistId, userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePlaylist(
    @Param('id') playlistId: number,
    @Body() playlistDto: PlaylistDto,
    @User('id') userId: number,
  ): Promise<void> {
    await this.playlistService.update(playlistId, playlistDto, userId);
  }
}
