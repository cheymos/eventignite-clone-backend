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
import { CreatedResponse } from '../../common/types/created-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { ContentService } from './content.service';
import { ContentDto } from './dtos/content.dto';
import { ContentEntity } from './entities/content.entity';

@Controller('contents')
@ApiTags('Contents')
@UseGuards(AuthGuard)
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @ApiOperation({ summary: 'Create content' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: CreatedResponse,
    description: 'Successfully created',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async createContent(
    @Body() contentDto: ContentDto,
    @User('id') userId: number,
  ): Promise<CreatedResponse> {
    const id = await this.contentService.create(contentDto, userId);

    return { id };
  }

  @ApiOperation({ summary: 'Get content by id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: ContentEntity,
    description: 'Successful operation',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Content not found' })
  @Get(':id')
  async getContent(
    @Param('id', ParseIntPipe) contentId: number,
    @User('id') userId: number,
  ): Promise<ContentEntity> {
    return this.contentService.getOne(contentId, userId);
  }

  @ApiOperation({ summary: 'Update content by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Content not found' })
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateContent(
    @Param('id', ParseIntPipe) contentId: number,
    @Body() contentDto: ContentDto,
    @User('id') userId: number,
  ): Promise<void> {
    await this.contentService.update(contentId, contentDto, userId);
  }

  @ApiOperation({ summary: 'Delete content by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully deleted' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Content not found' })
  @Delete(':id')
  async deleteContent(
    @Param('id', ParseIntPipe) contentId: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.contentService.delete(contentId, userId);
  }
}
