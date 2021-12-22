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
import { User } from '../../../common/decorators/user.decorator';
import { CreatedResponse } from '../../../common/types/created-response.type';
import { PaginateResponse } from '../../../common/types/paginate-response.type';
import { getPaginateResponseOptions } from '../../../utils/get-paginate-response-options.util';
import { AuthGuard } from '../../auth/guards/auth.guard';
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
    @User('sub') userId: string,
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
    @User('sub') userId: string,
  ): Promise<PaginateResponse<PlaylistContentEntity>> {
    return await this.playlistContentService.getPlaylistWithAllContents(
      playlistId,
      userId,
    );
  }

  @ApiOperation({ summary: 'Update playlist-content relationship by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePlaylistContentRelationship(
    @Body() playlistContentDto: PlaylistContentDto,
    @Param('playlistId', ParseIntPipe) playlistId: number,
    @Param('id', ParseIntPipe) playlistContentId: number,
    @User('sub') userId: string,
  ): Promise<void> {
    await this.playlistContentService.updateFullRelationship(
      playlistContentDto,
      playlistId,
      playlistContentId,
      userId,
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
    @Param('playlistId', ParseIntPipe) playlistId: number,
    @Param('id', ParseIntPipe) playlistContentId: number,
    @User('sub') userId: string,
  ): Promise<void> {
    await this.playlistContentService.deleteContentFromPlaylist(
      playlistId,
      playlistContentId,
      userId,
    );
  }
}
