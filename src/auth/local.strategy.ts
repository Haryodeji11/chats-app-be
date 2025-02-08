import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string): Promise<any> {
    const user = this.authService.verifyUser(email);
    if (!user) {
      throw new UnauthorizedException('Invalid User Credential');
    }
    return user;
  }
}
