import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { CreatedResponse } from '../../../common/types/created-response.type';
import { PaginateResponse } from '../../../common/types/paginate-response.type';
import { getPaginateResponseOptions } from '../../../utils/get-paginate-response-options.util';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { User } from '../../user/decorators/user.decorator';
import { PlaylistContentDto } from '../dtos/playlist-content.dto';
import { PlaylistContentEntity } from '../entities/playlist-content.entity';
import { PlaylistContentService } from '../services/playlist-content.service';

@Controller('playlists/:playlistId/contents')
@ApiTags('Playlists')
@UseGuards(AuthGuard)
export class PlaylistContentController {
  constructor(
    private readonly playlistContentService: PlaylistContentService,
  ) {}

  @ApiOperation({ summary: 'Add content to playlist' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: CreatedResponse,
    description: 'Successfully added',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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

  @ApiOperation({ summary: 'Get playlist with all contents' })
  @ApiBearerAuth()
  @ApiExtraModels(PlaylistContentEntity)
  @ApiExtraModels(PaginateResponse)
  @ApiResponse(getPaginateResponseOptions(PlaylistContentEntity))
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  @Get()
  async getPlaylistWithAllContents(
    @Param('playlistId', ParseIntPipe) playlistId: number,
    @User('id') userId: number,
  ): Promise<PaginateResponse<PlaylistContentEntity>> {
    return await this.playlistContentService.getPlaylistWithAllContents(
      playlistId,
      userId,
    );
  }

  @Put(':id')
  async updatePlaylistContentRelationship(
    @Body() playlistContentDto: PlaylistContentDto,
    @Param('playlistId', ParseIntPipe) playlistId: number,
    @Param('id', ParseIntPipe) playlistContentId: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.playlistContentService.updateFullRelationship(
      playlistContentDto,
      playlistId,
      playlistContentId,
      userId,
    );
  }
}
