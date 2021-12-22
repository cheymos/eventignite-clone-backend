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
import { User } from '../../common/decorators/user.decorator';
import { CreatedResponse } from '../../common/types/created-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ScreenDto } from './dtos/screen.dto';
import { ScreenEntity } from './entities/screen.entity';
import { ScreenService } from './screen.service';

@Controller('screens')
@ApiTags('Screens')
@UseGuards(AuthGuard)
export class ScreenController {
  constructor(private readonly screenService: ScreenService) {}

  @ApiOperation({ summary: 'Create screen' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: CreatedResponse,
    description: 'Successfully created',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async createScreen(
    @Body() screenDto: ScreenDto,
    @User('sub') userId: string,
  ): Promise<CreatedResponse> {
    const id = await this.screenService.create(screenDto, userId);

    return { id };
  }

  @ApiOperation({ summary: 'Get screen by id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: ScreenEntity,
    description: 'Successful operation',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Screen not found' })
  @Get(':id')
  async getScreen(
    @Param('id', ParseIntPipe) screenId: number,
    @User('sub') userId: string,
  ): Promise<ScreenEntity> {
    return this.screenService.getOne(screenId, userId);
  }

  @ApiOperation({ summary: 'Update screen by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Screen not found' })
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateScreen(
    @Param('id', ParseIntPipe) screenId: number,
    @Body() screenDto: ScreenDto,
    @User('sub') userId: string,
  ): Promise<void> {
    await this.screenService.update(screenId, screenDto, userId);
  }

  @ApiOperation({ summary: 'Delete screen by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully deleted' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Screen not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteScreen(
    @Param('id', ParseIntPipe) screenId: number,
    @User('sub') userId: string,
  ): Promise<void> {
    await this.screenService.delete(screenId, userId);
  }
}
