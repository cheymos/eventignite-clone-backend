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
import { User } from '../../../common/decorators/user.decorator';
import { OwnerGuard } from '../../../common/guards/owner.guard';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PlaylistDto } from '../dtos/playlist.dto';
import { PlaylistEntity } from '../entities/playlist.entity';
import { PlaylistRepository } from '../repositories/playlist.repository';
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
    type: PlaylistEntity,
    description: 'Successfully created',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async createPlaylist(
    @Body() playlistDto: PlaylistDto,
    @User('sub') userId: string,
  ): Promise<PlaylistEntity> {
    return this.playlistService.create(playlistDto, userId);
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
  @UseGuards(OwnerGuard(PlaylistRepository, 'id'))
  @Get(':id')
  async getPlaylist(
    @Param('id', ParseIntPipe) playlistId: number,
  ): Promise<PlaylistEntity> {
    return this.playlistService.getOne(playlistId);
  }

  @ApiOperation({ summary: 'Update playlist by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  @UseGuards(OwnerGuard(PlaylistRepository, 'id'))
  @Put(':id')
  async updatePlaylist(
    @Param('id', ParseIntPipe) playlistId: number,
    @Body() playlistDto: PlaylistDto,
  ): Promise<PlaylistEntity> {
    return this.playlistService.update(playlistId, playlistDto);
  }

  @ApiOperation({ summary: 'Delete playlist by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully deleted' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  @UseGuards(OwnerGuard(PlaylistRepository, 'id'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePlaylist(
    @Param('id', ParseIntPipe) playlistId: number,
  ): Promise<void> {
    await this.playlistService.delete(playlistId);
  }
}
