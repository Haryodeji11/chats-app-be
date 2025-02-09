import { Controller, Post, Get, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUser(): Promise<User[]> {
    return this.userService.getallUser();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param(':id') id: string): Promise<User> {
    return this.userService.getOneUser(id);
  }
}
