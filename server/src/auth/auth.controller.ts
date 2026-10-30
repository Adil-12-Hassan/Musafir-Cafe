import { Controller, Post, Body, UseGuards, Request, Res, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response, Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(@Request() req: ExpressRequest & { user: any }, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(req.user);

    // httpOnly cookie for refresh token
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { accessToken };
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Request() req: ExpressRequest & { cookies: any }) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      return { error: 'No refresh token' };
    }
    return this.authService.refresh(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Request() req: ExpressRequest & { user: any }, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req.user.sub);
    res.clearCookie('refresh_token');
    return { message: 'Logged out' };
  }
}
