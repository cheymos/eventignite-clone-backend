import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { sign, verify } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { jwtAccessConfig, jwtRefreshConfig } from '../../configs/jwt.config';
import { UserEntity } from '../user/entities/user.entity';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { TokenPayload } from './types/token-payload.type';
import { Tokens } from './types/tokens.type';

@Injectable()
export class TokenService {
  private readonly JWT_ACCESS_SECRET =
    this.configService.get('JWT_ACCESS_SECRET');
  private readonly JWT_REFRESH_SECRET =
    this.configService.get('JWT_REFRESH_SECRET');

  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    private readonly configService: ConfigService,
  ) {}

  generateTokens(payload: TokenPayload): Tokens {
    const accessToken = sign(payload, this.JWT_ACCESS_SECRET, jwtAccessConfig);
    const refreshToken = sign(
      payload,
      this.JWT_REFRESH_SECRET,
      jwtRefreshConfig,
    );

    return { accessToken, refreshToken };
  }

  generateTokenPayload({
    id,
    username,
  }: Omit<UserEntity, 'email'>): TokenPayload {
    return { id, username };
  }

  async saveRefreshToken(userId: number, token: string): Promise<void> {
    const tokenData = await this.refreshTokenRepository.findOne({ userId });

    if (tokenData) {
      tokenData.refreshToken = token;
      await this.refreshTokenRepository.update(tokenData.id, tokenData);
    } else {
      const refreshToken = new RefreshTokenEntity(userId, token);
      await this.refreshTokenRepository.save(refreshToken);
    }
  }

  validateToken(
    type: 'ACCESS' | 'REFRESH',
    token: string,
  ): TokenPayload | null {
    try {
      const userData = verify(
        token,
        type === 'ACCESS' ? this.JWT_ACCESS_SECRET : this.JWT_REFRESH_SECRET,
      ) as TokenPayload;

      return userData;
    } catch (_) {
      return null;
    }
  }

  findRefreshToken(token: string): Promise<RefreshTokenEntity | undefined> {
    return this.refreshTokenRepository.findOne({ refreshToken: token });
  }

  async removeRefreshToken(token: string): Promise<void> {
    await this.refreshTokenRepository.delete({ refreshToken: token });
  }
}
