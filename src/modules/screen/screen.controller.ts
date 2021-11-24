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
    @User('id') userId: number,
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
    @User('id') userId: number,
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
    @User('id') userId: number,
  ): Promise<void> {
    await this.screenService.update(screenId, screenDto, userId);
  }

  @ApiOperation({ summary: 'Delete screen by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully deleted' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Screen not found' })
  @Delete(':id')
  async deleteScreen(
    @Param('id', ParseIntPipe) screenId: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.screenService.delete(screenId, userId);
  }
}
