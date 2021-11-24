import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ScreenDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  readonly playlistId: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  readonly eventId: number;
}
