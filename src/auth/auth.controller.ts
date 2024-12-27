import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService
      .validateUser(loginDto.email, loginDto.password)
      .then((user) => this.authService.login(user));
  }

  @Post('protected')
  @UseGuards(AuthGuard('jwt'))
  async protectedRoute(@Req() req: any) {
    return { message: 'This is a protected route', user: req.user };
  }
}
