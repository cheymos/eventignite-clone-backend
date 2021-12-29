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
import { User } from '../../common/decorators/user.decorator';
import { OwnerGuard } from '../../common/guards/owner.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { EventBodyOwnerGuard } from '../event/guards/event-body-owner.guard';
import { PlaylistBodyOwnerGuard } from '../playlist/guards/playlist-body-owner.guard';
import { ScreenDto } from './dtos/screen.dto';
import { ScreenEntity } from './entities/screen.entity';
import { ScreenRepository } from './screen.repository';
import { ScreenService } from './screen.service';

@Controller('screens')
@ApiTags('Screens')
@UseGuards(AuthGuard)
export class ScreenController {
  constructor(private readonly screenService: ScreenService) {}

  @ApiOperation({ summary: 'Create screen' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: ScreenEntity,
    description: 'Successfully created',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(EventBodyOwnerGuard, PlaylistBodyOwnerGuard)
  @Post()
  async createScreen(
    @Body() screenDto: ScreenDto,
    @User('sub') userId: string,
  ): Promise<ScreenEntity> {
    return this.screenService.create(screenDto, userId);
  }

  @ApiOperation({ summary: 'Get screen by id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: ScreenEntity,
    description: 'Successful operation',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Screen not found' })
  @UseGuards(OwnerGuard(ScreenRepository, 'id'))
  @Get(':id')
  async getScreen(
    @Param('id', ParseIntPipe) screenId: number,
  ): Promise<ScreenEntity> {
    return this.screenService.getOne(screenId);
  }

  @ApiOperation({ summary: 'Update screen by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Screen not found' })
  @UseGuards(
    OwnerGuard(ScreenRepository, 'id'),
    EventBodyOwnerGuard,
    PlaylistBodyOwnerGuard,
  )
  @Put(':id')
  async updateScreen(
    @Param('id', ParseIntPipe) screenId: number,
    @Body() screenDto: ScreenDto,
    @User('sub') userId: string,
  ): Promise<ScreenEntity> {
    return this.screenService.update(screenId, screenDto, userId);
  }

  @ApiOperation({ summary: 'Delete screen by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully deleted' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Screen not found' })
  @UseGuards(OwnerGuard(ScreenRepository, 'id'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteScreen(
    @Param('id', ParseIntPipe) screenId: number,
    @User('sub') userId: string,
  ): Promise<void> {
    await this.screenService.delete(screenId, userId);
  }
}
