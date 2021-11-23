import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreatedResponse } from '../../common/types/created-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { ScreenDto } from './dtos/screen.dto';
import { ScreenEntity } from './entities/screen.entity';
import { ScreenService } from './screen.service';

@Controller('screens')
@UseGuards(AuthGuard)
export class ScreenController {
  constructor(private readonly screenService: ScreenService) {}

  @Post()
  async createScreen(
    @Body() screenDto: ScreenDto,
    @User('id') userId: number,
  ): Promise<CreatedResponse> {
    const id = await this.screenService.create(screenDto, userId);

    return { id };
  }

  @Get(':id')
  async getScreen(
    @Param('id') screenId: number,
    @User('id') userId: number,
  ): Promise<ScreenEntity> {
    return this.screenService.getOne(screenId, userId);
  }
}
