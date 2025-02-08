import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtAuthGuard } from './jwt.auth.guard';
import { CreateUserDto } from 'src/user/dto/userService.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async(@Body() createUserDTO: CreateUserDto) {
    return this.authService.createUser(createUserDTO);
  }

  @Post('login')
  async login(@Body() req: { email: string; password: string }) {
    return this.authService.signin(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req: Request) {
    req.logout((err) => {
      if (err) {
        return { message: 'Logout failed', error: err };
      }
    });
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
