import { IsString } from 'class-validator';

export class ContentPropertyDto {
  @IsString()
  property: string;

  @IsString()
  value: string;
}
