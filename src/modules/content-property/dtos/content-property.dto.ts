import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ContentPropertyDto {
  @ApiProperty()
  @IsString()
  property: string;

  @ApiProperty()
  @IsString()
  value: string;
}
