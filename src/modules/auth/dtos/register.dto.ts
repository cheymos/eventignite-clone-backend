import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @ApiProperty({ minLength: 3, maxLength: 36 })
  @IsString()
  @Length(3, 36)
  readonly username: string;
}
