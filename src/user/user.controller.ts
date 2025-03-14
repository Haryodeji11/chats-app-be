import {
  Controller,
  Post,
  Get,
  UseGuards,
  Param,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import mongoose from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUser(): Promise<User[]> {
    return await this.userService.getallUser();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    return await this.userService.getOneUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userService.deleteUser(id);
  }
}
