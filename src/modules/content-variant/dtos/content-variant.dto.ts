import { IsString } from 'class-validator';

export class ContentVariantDto {
  @IsString()
  body: string;
}
