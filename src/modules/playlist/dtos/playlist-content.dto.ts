import { IsInt, Min } from 'class-validator';

export class PlaylistContentDto {
  @IsInt()
  @Min(0)
  contentId: number;

  @IsInt()
  @Min(0)
  pos: number;

  @IsInt()
  @Min(0)
  duration: number;
}
