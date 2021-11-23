import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreatedResponse } from '../../common/types/created-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { ContentService } from './content.service';
import { ContentDto } from './dtos/content.dto';

@Controller('contents')
@UseGuards(AuthGuard)
export class ContentController {
  constructor(private readonly contentController: ContentService) {}

  @Post()
  async createContent(
    @Body() contentDto: ContentDto,
    @User('id') userId: number,
  ): Promise<CreatedResponse> {
    const id = await this.contentController.create(contentDto, userId);

    return { id };
  }
}
