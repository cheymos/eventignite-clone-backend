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
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedResponse } from '../../common/types/created-response.type';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { getPaginateResponseOptions } from '../../utils/get-paginate-response-options.util';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { ContentVariantService } from './content-variant.service';
import { ContentVariantDto } from './dtos/content-variant.dto';
import { ContentVariantEntity } from './entities/content-variant.entity';

@Controller('contents/:contentId/variants')
@ApiTags('Content variants')
@UseGuards(AuthGuard)
export class ContentVariantController {
  constructor(private readonly contentVariantService: ContentVariantService) {}

  @ApiOperation({ summary: 'Create content variant' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: CreatedResponse,
    description: 'Successfully created',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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

  @ApiOperation({ summary: 'Get content variant by id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: ContentVariantEntity,
    description: 'Successful operation',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Content variant not found' })
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

  @ApiOperation({ summary: 'Get all content variants' })
  @ApiBearerAuth()
  @ApiExtraModels(ContentVariantEntity)
  @ApiResponse(getPaginateResponseOptions(ContentVariantEntity))
  @ApiResponse({ status: 403, description: 'Access denied' })
  @Get()
  async getAllContentVariants(
    @Param('contentId', ParseIntPipe) contentId: number,
    @User('id') userId: number,
  ): Promise<PaginateResponse<ContentVariantEntity>> {
    return this.contentVariantService.getAllVariants(contentId, userId);
  }

  @ApiOperation({ summary: 'Update content variant by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Content variant not found' })
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

  @ApiOperation({ summary: 'Delete content variant by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully deleted' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Content variant not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteContentVariant(
    @Param('id', ParseIntPipe) contentVariantId: number,
    @Param('contentId', ParseIntPipe) contentId: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.contentVariantService.delete(
      contentVariantId,
      contentId,
      userId,
    );
  }
}
