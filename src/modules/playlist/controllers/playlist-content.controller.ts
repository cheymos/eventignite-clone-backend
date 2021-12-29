import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { OwnerGuard } from '../../../common/guards/owner.guard';
import { PaginateResponse } from '../../../common/types/paginate-response.type';
import { getPaginateResponseOptions } from '../../../utils/get-paginate-response-options.util';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ContentBodyOwnerGuard } from '../../content/guards/content-body-owner.guard';
import { PlaylistContentDto } from '../dtos/playlist-content.dto';
import { PlaylistContentEntity } from '../entities/playlist-content.entity';
import { PlaylistRepository } from '../repositories/playlist.repository';
import { PlaylistContentService } from '../services/playlist-content.service';

@Controller('playlists/:playlistId/contents')
@ApiTags('Playlists')
@UseGuards(AuthGuard, OwnerGuard(PlaylistRepository, 'playlistId'))
export class PlaylistContentController {
  constructor(
    private readonly playlistContentService: PlaylistContentService,
  ) {}

  @ApiOperation({ summary: 'Add content to playlist' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: PlaylistContentEntity,
    description: 'Successfully added',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(ContentBodyOwnerGuard)
  @Post()
  async addContentToPlaylist(
    @Body() playlistContentDto: PlaylistContentDto,
    @Param('playlistId', ParseIntPipe) playlistId: number,
  ): Promise<PlaylistContentEntity> {
    return this.playlistContentService.addContentToPlaylist(
      playlistContentDto,
      playlistId,
    );
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
  ): Promise<PaginateResponse<PlaylistContentEntity>> {
    return await this.playlistContentService.getPlaylistWithAllContents(
      playlistId,
    );
  }

  @ApiOperation({ summary: 'Update playlist-content relationship by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  @Put(':id')
  async updatePlaylistContentRelationship(
    @Body() playlistContentDto: PlaylistContentDto,
    @Param('playlistId', ParseIntPipe) playlistId: number,
    @Param('id', ParseIntPipe) playlistContentId: number,
  ): Promise<PlaylistContentEntity> {
    return this.playlistContentService.updateFullRelationship(
      playlistContentDto,
      playlistId,
      playlistContentId,
    );
  }

  @ApiOperation({ summary: 'Delete content from playlist by relationship id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully deleted' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteContentFromPlaylist(
    @Param('id', ParseIntPipe) playlistContentId: number,
  ): Promise<void> {
    await this.playlistContentService.deleteContentFromPlaylist(
      playlistContentId,
    );
  }
}
