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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { CreatedResponse } from '../../common/types/created-response.type';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ContentPropertyService } from './content-property.service';
import { ContentPropertyDto } from './dtos/content-property.dto';
import { ContentPropertyEntity } from './entities/content-property.entity';

@Controller('contents/:contentId/variants/:contentVariantId/properties')
@ApiTags('Content properties')
@UseGuards(AuthGuard)
export class ContentPropertyController {
  constructor(
    private readonly contentPropertyService: ContentPropertyService,
  ) {}

  @ApiOperation({ summary: 'Create content property' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: CreatedResponse,
    description: 'Successfully created',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async createContentVariantProperty(
    @Body() contentPropertyDto: ContentPropertyDto,
    @Param('contentId', ParseIntPipe) contentId: number,
    @Param('contentVariantId', ParseIntPipe) contentVariantId: number,
    @User('sub') userId: string,
  ): Promise<CreatedResponse> {
    const { id } = await this.contentPropertyService.create(
      contentPropertyDto,
      contentId,
      contentVariantId,
      userId,
    );

    return { id };
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
    @Param('contentId', ParseIntPipe) contentId: number,
    @Param('contentVariantId', ParseIntPipe) contentVariantId: number,
    @User('sub') userId: string,
  ): Promise<PaginateResponse<ContentPropertyEntity>> {
    return this.contentPropertyService.getAll(
      contentId,
      contentVariantId,
      userId,
    );
  }

  @ApiOperation({ summary: 'Update content property by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateProperty(
    @Body() contentPropertyDto: ContentPropertyDto,
    @Param('id', ParseIntPipe) contentPropertyId: number,
    @Param('contentId', ParseIntPipe) contentId: number,
    @Param('contentVariantId', ParseIntPipe) contentVariantId: number,
    @User('sub') userId: string,
  ): Promise<void> {
    await this.contentPropertyService.update(
      contentPropertyId,
      contentPropertyDto,
      contentId,
      contentVariantId,
      userId,
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
    @Param('contentId', ParseIntPipe) contentId: number,
    @Param('contentVariantId', ParseIntPipe) contentVariantId: number,
    @User('sub') userId: string,
  ): Promise<void> {
    await this.contentPropertyService.delete(
      contentPropertyId,
      contentId,
      contentVariantId,
      userId,
    );
  }
}
