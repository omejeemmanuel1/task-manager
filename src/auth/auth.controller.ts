import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async signUp(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ message: string }> {
    return this.authService.signUp(username, password);
  }

  @Post('/login')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ message: string; accessToken: string }> {
    return this.authService.signIn(username, password);
  }
}
