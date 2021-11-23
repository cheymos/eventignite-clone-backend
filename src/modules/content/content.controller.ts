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
import { CreatedResponse } from '../../common/types/created-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { ContentService } from './content.service';
import { ContentDto } from './dtos/content.dto';
import { ContentEntity } from './entities/content.entity';

@Controller('contents')
@UseGuards(AuthGuard)
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  async createContent(
    @Body() contentDto: ContentDto,
    @User('id') userId: number,
  ): Promise<CreatedResponse> {
    const id = await this.contentService.create(contentDto, userId);

    return { id };
  }

  @Get(':id')
  async getContent(
    @Param('id', ParseIntPipe) contentId: number,
    @User('id') userId: number,
  ): Promise<ContentEntity> {
    return this.contentService.getOne(contentId, userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateContent(
    @Param('id', ParseIntPipe) contentId: number,
    @Body() contentDto: ContentDto,
    @User('id') userId: number,
  ): Promise<void> {
    await this.contentService.update(contentId, contentDto, userId);
  }

  @Delete(':id')
  async deleteContent(
    @Param('id', ParseIntPipe) contentId: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.contentService.delete(contentId, userId);
  }
}
