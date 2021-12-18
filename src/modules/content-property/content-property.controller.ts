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
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { ContentPropertyService } from './content-property.service';
import { ContentPropertyDto } from './dtos/content-property.dto';
import { ContentPropertyEntity } from './entities/content-property.entity';

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

  @Get()
  async getAllContentVariantProperties(
    @Param('contentId', ParseIntPipe) contentId: number,
    @Param('contentVariantId', ParseIntPipe) contentVariantId: number,
    @User('id') userId: number,
  ): Promise<PaginateResponse<ContentPropertyEntity>> {
    return this.contentPropertyService.getAll(
      contentId,
      contentVariantId,
      userId,
    );
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateProperty(
    @Body() contentPropertyDto: ContentPropertyDto,
    @Param('id', ParseIntPipe) contentPropertyId: number,
    @Param('contentId', ParseIntPipe) contentId: number,
    @Param('contentVariantId', ParseIntPipe) contentVariantId: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.contentPropertyService.update(
      contentPropertyId,
      contentPropertyDto,
      contentId,
      contentVariantId,
      userId,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProperty(
    @Param('id', ParseIntPipe) contentPropertyId: number,
    @Param('contentId', ParseIntPipe) contentId: number,
    @Param('contentVariantId', ParseIntPipe) contentVariantId: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.contentPropertyService.delete(
      contentPropertyId,
      contentId,
      contentVariantId,
      userId,
    );
  }
}
