import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    const userAdmin = await this.authService.validateUserAdmin(
      body.email,
      body.senha,
    );
    return this.authService.login(userAdmin);
  }
}
