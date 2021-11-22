import { IsOptional, IsString } from 'class-validator';

export class PlaylistDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;
}
