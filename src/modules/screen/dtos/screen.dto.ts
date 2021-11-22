import {
  IsNumber,
  IsOptional,
  IsString,
  Min
} from 'class-validator';

export class ScreenDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsNumber()
  @Min(0)
  readonly playlistId: number;

  @IsNumber()
  @Min(0)
  readonly eventId: number;
}
