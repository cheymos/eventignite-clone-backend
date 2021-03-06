import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ContentType } from '../entities/content.entity';

export class ContentDto {
  @ApiProperty({ enum: ContentType, enumName: 'ContentType' })
  @IsEnum(ContentType)
  type: ContentType;
}
