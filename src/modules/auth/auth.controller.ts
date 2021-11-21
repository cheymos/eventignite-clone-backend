import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { Response } from 'express';
import { Cookies } from '../../common/decorators/cookies.decorator';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './types/login-response.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(MainValidationPipe)
  async register(@Body() registerData: RegisterDto): Promise<void> {
    await this.authService.register(registerData);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(MainValidationPipe)
  async login(
    @Body() loginData: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const user = await this.authService.authenticateUser(loginData);
    const response = await this.authService.buildLoginResponse(user);
    this.placeRefreshTokenInCookies(res, response.refreshToken);

    return response;
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async logout(
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const user = await this.authService.refresh(refreshToken);

    const response = await this.authService.buildLoginResponse(user);
    this.placeRefreshTokenInCookies(res, response.refreshToken);

    return response;
  }

  private placeRefreshTokenInCookies(
    res: Response<LoginResponse>,
    refreshToken: string,
  ): void {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 2592000000,
    });
  }
}
