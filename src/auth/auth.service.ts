import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/userService.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async verifyUser(email: string) {
    const user = await this.userService.findOne(email);
    if (user) {
      throw new UnauthorizedException('user already exist');
    }

    return user;
  }

  async createUser(createUser: CreateUserDto): Promise<any> {
    if (
      !createUser?.email ||
      !createUser?.password ||
      !createUser?.phoneNumber ||
      !createUser?.userName
    ) {
      throw new UnauthorizedException('fill all input field');
    }

    const user = await this.userService.findOne(createUser?.email);
    if (user) {
      throw new UnauthorizedException('user already exist');
    }

    const hashPassword = await bcrypt.hash(createUser?.password, 10);
    return await this.userService.createUser({
      ...createUser,
      password: hashPassword,
    });
  }

  async signin(req: { email: string; password: string }): Promise<any> {
    const user = await this.userService.findOne(req?.email);
    if (user && (await bcrypt.compare(req?.password, user?.password))) {
      const payload = { sub: user?.userId, username: user?.userName };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException('Invalid login credential');
  }
}
