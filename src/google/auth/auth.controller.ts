import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req) { }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  redirect(@Request() req) {
    return this.authService.login(req?.user);
  }
}