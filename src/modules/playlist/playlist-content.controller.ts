import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards
} from '@nestjs/common';
import { CreatedResponse } from '../../common/types/created-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { PlaylistContentDto } from './dtos/playlist-content.dto';
import { PlaylistContentService } from './playlist-content.service';

@Controller('playlists/:playlistId/contents')
@UseGuards(AuthGuard)
export class PlaylistContentController {
  constructor(
    private readonly playlistContentService: PlaylistContentService,
  ) {}

  @Post()
  async addContentToPlaylist(
    @Body() playlistContentDto: PlaylistContentDto,
    @Param('playlistId', ParseIntPipe) playlistId: number,
    @User('id') userId: number,
  ): Promise<CreatedResponse> {
    const id = await this.playlistContentService.addContentToPlaylist(
      playlistContentDto,
      playlistId,
      userId,
    );

    return { id };
  }
}
