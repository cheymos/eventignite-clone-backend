import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Response } from 'express';
import { Cookies } from '../../common/decorators/cookies.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './types/login-response.type';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User registration in system' })
  @ApiResponse({ status: 201, description: 'Successful operation' })
  @Post('register')
  async register(@Body() registerData: RegisterDto): Promise<void> {
    await this.authService.register(registerData);
  }

  @ApiOperation({ summary: 'Logs user into the system' })
  @ApiResponse({
    status: 200,
    type: LoginResponse,
    description:
      'Sets "refreshToken" cookies. The access token will expire in 30 minutes, refresh token - 30 days',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginData: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const user = await this.authService.authenticateUser(loginData);
    const response = await this.authService.buildLoginResponse(user);
    this._placeRefreshTokenInCookies(res, response.refreshToken);

    return response;
  }

  @ApiOperation({ summary: 'Logs out current logged in user session' })
  @ApiResponse({ status: 204, description: 'Successful operation' })
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

  @ApiOperation({
    summary: 'Updating refresh and access tokens',
  })
  @ApiResponse({
    type: LoginResponse,
    description: 'Successful operation (refresh token must be in cookies)',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const user = await this.authService.refresh(refreshToken);

    const response = await this.authService.buildLoginResponse(user);
    this._placeRefreshTokenInCookies(res, response.refreshToken);

    return response;
  }

  private _placeRefreshTokenInCookies(
    res: Response<LoginResponse>,
    refreshToken: string,
  ): void {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 2592000000,
    });
  }
}
