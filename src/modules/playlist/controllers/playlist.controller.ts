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
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { CreatedResponse } from '../../../common/types/created-response.type';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { User } from '../../user/decorators/user.decorator';
import { PlaylistDto } from '../dtos/playlist.dto';
import { PlaylistEntity } from '../entities/playlist.entity';
import { PlaylistService } from '../services/playlist.service';

@Controller('playlists')
@ApiTags('Playlists')
@UseGuards(AuthGuard)
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @ApiOperation({ summary: 'Create playlist' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: CreatedResponse,
    description: 'Successfully created',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async createPlaylist(
    @Body() playlistDto: PlaylistDto,
    @User('id') userId: number,
  ): Promise<CreatedResponse> {
    const playlistId = await this.playlistService.create(playlistDto, userId);

    return { id: playlistId };
  }

  @ApiOperation({ summary: 'Get playlist by id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: PlaylistEntity,
    description: 'Successful operation',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  @Get(':id')
  async getPlaylist(
    @Param('id', ParseIntPipe) playlistId: number,
    @User('id') userId: number,
  ): Promise<PlaylistEntity> {
    return this.playlistService.getOne(playlistId, userId);
  }

  @ApiOperation({ summary: 'Update playlist by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePlaylist(
    @Param('id', ParseIntPipe) playlistId: number,
    @Body() playlistDto: PlaylistDto,
    @User('id') userId: number,
  ): Promise<void> {
    await this.playlistService.update(playlistId, playlistDto, userId);
  }

  @ApiOperation({ summary: 'Delete playlist by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully deleted' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  @Delete(':id')
  async deletePlaylist(
    @Param('id', ParseIntPipe) playlistId: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.playlistService.delete(playlistId, userId);
  }
}
