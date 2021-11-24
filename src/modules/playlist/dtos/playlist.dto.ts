import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PlaylistDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly description: string;
}
