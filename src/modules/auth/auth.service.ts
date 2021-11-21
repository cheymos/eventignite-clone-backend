import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  EMAIL_IS_ALREADY_USE,
  EMAIL_NOT_FOUND,
  PASSWORD_INVALID,
  USERNAME_IS_ALREADY_USE
} from '../../common/constants/error.constants';
import {
  Errors,
  InvalidFieldsException
} from '../../common/exceptions/invalid-fields.exception';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { TokenService } from './token.service';
import { LoginResponse } from './types/login-response.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async register({ email, username, password }: RegisterDto): Promise<void> {
    const errors: Errors<UserEntity> = {};

    const userByEmail = await this.userService.findBy('email', email);
    const userByUsername = await this.userService.findBy('username', username);

    if (userByEmail) errors.email = [EMAIL_IS_ALREADY_USE];
    if (userByUsername) errors.username = [USERNAME_IS_ALREADY_USE];

    if (Object.keys(errors).length > 0) {
      throw new InvalidFieldsException(errors);
    }

    const passwordHash = await bcrypt.hash(password, 5);
    await this.userService.create({ email, username, password: passwordHash });
  }

  async authenticateUser({ email, password }: LoginDto): Promise<UserEntity> {
    const user = await this.userService.findBy('email', email, true);

    if (!user) throw new InvalidFieldsException({ email: [EMAIL_NOT_FOUND] });

    const isCorrectPass = await bcrypt.compare(password, user.password);

    if (!isCorrectPass)
      throw new InvalidFieldsException({ password: [PASSWORD_INVALID] });

    return user;
  }

  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) throw new UnauthorizedException();

    try {
      await this.tokenService.removeRefreshToken(refreshToken);
    } catch (_) {
      throw new UnauthorizedException();
    }
  }

  async refresh(refreshToken: string): Promise<UserEntity> {
    if (!refreshToken) throw new UnauthorizedException();

    const userData = this.tokenService.validateToken('REFRESH', refreshToken);

    if (!userData) throw new UnauthorizedException();

    const tokenDataFromDb = await this.tokenService.findRefreshToken(
      refreshToken,
    );

    if (!tokenDataFromDb) throw new UnauthorizedException();

    // @ts-ignore
    return this.userService.findBy('id', tokenDataFromDb.userId);
  }

  async buildLoginResponse(
    user: Omit<UserEntity, 'email'>,
  ): Promise<LoginResponse> {
    const tokenPayload = this.tokenService.generateTokenPayload(user);
    const tokens = this.tokenService.generateTokens(tokenPayload);

    await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);

    return { user: tokenPayload, ...tokens };
  }
}
