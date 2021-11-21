import { IsOptional, IsString } from 'class-validator';

export class EventDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;
}
