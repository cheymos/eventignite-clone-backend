import {
  Body,
  Controller,
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
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { ContentVariantService } from './content-variant.service';
import { ContentVariantDto } from './dtos/content-variant.dto';
import { ContentVariantEntity } from './entities/content-variant.entity';

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

  @Get(':id')
  async getContentVariant(
    @Param('id', ParseIntPipe) contentVariantId: number,
    @Param('contentId', ParseIntPipe) contentId: number,
    @User('id') userId: number,
  ): Promise<ContentVariantEntity> {
    return this.contentVariantService.getOne(
      contentVariantId,
      contentId,
      userId,
    );
  }

  @Get()
  async getAllContentVariants(
    @Param('contentId', ParseIntPipe) contentId: number,
    @User('id') userId: number,
  ): Promise<PaginateResponse<ContentVariantEntity>> {
    return this.contentVariantService.getAllVariants(contentId, userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateContentVariant(
    @Body() contentVariantDto: ContentVariantDto,
    @Param('id', ParseIntPipe) contentVariantId: number,
    @Param('contentId', ParseIntPipe) contentId: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.contentVariantService.update(
      contentVariantDto,
      contentVariantId,
      contentId,
      userId,
    );
  }
}
