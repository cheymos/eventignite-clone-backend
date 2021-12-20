import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { FILE_NOT_ATTACHED } from '../../common/constants/error.constants';
import { ValueExistsPipe } from '../../common/pipes/value-exists.pipe';
import { CreatedResponse } from '../../common/types/created-response.type';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { getPaginateResponseOptions } from '../../utils/get-paginate-response-options.util';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { ContentVariantService } from './content-variant.service';
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async createContentVariant(
    @UploadedFile(new ValueExistsPipe(FILE_NOT_ATTACHED))
    { filename, buffer }: Express.Multer.File,
    @Param('contentId', ParseIntPipe) contentId: number,
    @User('id') userId: number,
  ): Promise<CreatedResponse> {
    const { id } = await this.contentVariantService.create(
      filename,
      buffer,
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
  @UseInterceptors(FileInterceptor('file'))
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateContentVariant(
    @UploadedFile() { filename, buffer }: Express.Multer.File,
    @Param('id', ParseIntPipe) contentVariantId: number,
    @Param('contentId', ParseIntPipe) contentId: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.contentVariantService.update(
      filename,
      buffer,
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
