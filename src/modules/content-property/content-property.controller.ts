import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards
} from '@nestjs/common';
import { CreatedResponse } from '../../common/types/created-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { ContentPropertyService } from './content-property.service';
import { ContentPropertyDto } from './dtos/content-property.dto';

@Controller('contents/:contentId/variants/:contentVariantId/properties')
@UseGuards(AuthGuard)
export class ContentPropertyController {
  constructor(
    private readonly contentPropertyService: ContentPropertyService,
  ) {}

  @Post()
  async createContentVariantProperty(
    @Body() contentPropertyDto: ContentPropertyDto,
    @Param('contentId', ParseIntPipe) contentId: number,
    @Param('contentVariantId', ParseIntPipe) contentVariantId: number,
    @User('id') userId: number,
  ): Promise<CreatedResponse> {
    const { id } = await this.contentPropertyService.create(
      contentPropertyDto,
      contentId,
      contentVariantId,
      userId,
    );

    return { id };
  }
}
