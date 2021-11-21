import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MaxLength(254)
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}
