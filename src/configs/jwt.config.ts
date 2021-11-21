import { SignOptions } from 'jsonwebtoken';

export const jwtAccessConfig: SignOptions = {
  expiresIn: '30m',
};

export const jwtRefreshConfig: SignOptions = {
  expiresIn: '30d',
};
