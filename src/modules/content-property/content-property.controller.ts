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
import { OwnerGuard } from '../../common/guards/owner.guard';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ContentRepository } from '../content/content.repository';
import { ContentPropertyService } from './content-property.service';
import { ContentPropertyDto } from './dtos/content-property.dto';
import { ContentPropertyEntity } from './entities/content-property.entity';

@Controller('contents/:contentId/variants/:contentVariantId/properties')
@ApiTags('Content properties')
@UseGuards(AuthGuard, OwnerGuard(ContentRepository, 'contentId'))
export class ContentPropertyController {
  constructor(
    private readonly contentPropertyService: ContentPropertyService,
  ) {}

  @ApiOperation({ summary: 'Create content property' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: ContentPropertyEntity,
    description: 'Successfully created',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async createContentVariantProperty(
    @Body() contentPropertyDto: ContentPropertyDto,
    @Param('contentVariantId', ParseIntPipe) contentVariantId: number,
  ): Promise<ContentPropertyEntity> {
    return this.contentPropertyService.create(
      contentPropertyDto,
      contentVariantId,
    );
  }

  @ApiOperation({ summary: 'Get all properties of content variant' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: ContentPropertyEntity,
    description: 'Successful operation',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @Get()
  async getAllContentVariantProperties(
    @Param('contentVariantId', ParseIntPipe) contentVariantId: number,
  ): Promise<PaginateResponse<ContentPropertyEntity>> {
    return this.contentPropertyService.getAll(contentVariantId);
  }

  @ApiOperation({ summary: 'Update content property by id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: ContentPropertyEntity,
    description: 'Successfully updated',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @Put(':id')
  async updateProperty(
    @Body() contentPropertyDto: ContentPropertyDto,
    @Param('id', ParseIntPipe) contentPropertyId: number,
    @Param('contentVariantId', ParseIntPipe) contentVariantId: number,
  ): Promise<ContentPropertyEntity> {
    return this.contentPropertyService.update(
      contentPropertyId,
      contentPropertyDto,
      contentVariantId,
    );
  }

  @ApiOperation({ summary: 'Delete content property by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully deleted' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProperty(
    @Param('id', ParseIntPipe) contentPropertyId: number,
    @Param('contentVariantId', ParseIntPipe) contentVariantId: number,
  ): Promise<void> {
    await this.contentPropertyService.delete(
      contentPropertyId,
      contentVariantId,
    );
  }
}
