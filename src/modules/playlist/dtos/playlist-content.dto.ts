import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class PlaylistContentDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  contentId: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  pos: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  duration: number;
}
