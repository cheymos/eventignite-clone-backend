import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreatedResponse } from '../../common/types/created-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { EventDto } from './dtos/event.dto';
import { EventEntity } from './entities/event.entity';
import { EventService } from './event.service';

@Controller('events')
@UseGuards(AuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(
    @Body() eventDto: EventDto,
    @User('id') userId: number,
  ): Promise<CreatedResponse> {
    const eventId = await this.eventService.create(eventDto, userId);

    return { id: eventId };
  }

  @Get(':id')
  async getEvent(
    @Param('id') eventId: number,
    @User('id') userId: number,
  ): Promise<EventEntity> {
    return this.eventService.getOne(eventId, userId);
  }
}
