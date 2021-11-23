import { IsEnum, IsString } from 'class-validator';
import { ContentType } from '../entities/content.entity';

export class ContentDto {
  @IsEnum(ContentType)
  type: ContentType;

  @IsString()
  body: string;
}
