import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CreatedResponse } from '../../common/types/created-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { ContentVariantService } from './content-variant.service';
import { ContentVariantDto } from './dtos/content-variant.dto';

@Controller('contents/:contentId/variants')
@UseGuards(AuthGuard)
export class ContentVariantController {
  constructor(private readonly contentVariantService: ContentVariantService) {}

  @Post()
  async createContentVariant(
    @Body() contentVariantDto: ContentVariantDto,
    @Param('contentId', ParseIntPipe) contentId: number,
    @User('id') userId: number,
  ): Promise<CreatedResponse> {
    const { id } = await this.contentVariantService.create(
      contentVariantDto,
      contentId,
      userId,
    );

    return { id };
  }
}
