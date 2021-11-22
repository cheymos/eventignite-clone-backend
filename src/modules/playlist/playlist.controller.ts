import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreatedResponse } from '../../common/types/created-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { PlaylistDto } from './dtos/playlist.dto';
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
}
