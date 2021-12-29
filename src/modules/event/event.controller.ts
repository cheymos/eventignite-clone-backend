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
import { EventDto } from './dtos/event.dto';
import { EventEntity } from './entities/event.entity';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';

@Controller('events')
@UseGuards(AuthGuard)
@ApiTags('Events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: 'Create event' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: EventEntity,
    description: 'Successfully created',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async createEvent(
    @Body() eventDto: EventDto,
    @User('sub') userId: string,
  ): Promise<EventEntity> {
    return this.eventService.create(eventDto, userId);
  }

  @ApiOperation({ summary: 'Get event by id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: EventEntity,
    description: 'Successful operation',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @UseGuards(OwnerGuard(EventRepository, 'id'))
  @Get(':id')
  async getEvent(
    @Param('id', ParseIntPipe) eventId: number,
  ): Promise<EventEntity> {
    return this.eventService.getOne(eventId);
  }

  @ApiOperation({ summary: 'Update event by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @UseGuards(OwnerGuard(EventRepository, 'id'))
  @Put(':id')
  async updateEvent(
    @Param('id', ParseIntPipe) eventId: number,
    @Body() eventDto: EventDto,
  ): Promise<EventEntity> {
    return this.eventService.update(eventId, eventDto);
  }

  @ApiOperation({ summary: 'Delete event by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully deleted' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @UseGuards(OwnerGuard(EventRepository, 'id'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEvent(@Param('id', ParseIntPipe) eventId: number): Promise<void> {
    await this.eventService.delete(eventId);
  }
}
