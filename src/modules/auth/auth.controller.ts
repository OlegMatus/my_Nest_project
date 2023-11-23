import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard())
  @Post('/login')
  public async login(@Body() body: any) {
    await this.authService.login(body);
  }
  @Post('/logout')
  public async logout() {}
}
