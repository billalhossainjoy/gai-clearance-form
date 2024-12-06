import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'identifier' });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validate(username, password);
    if (!user) throw new Error('invalid credentials.');

    return user;
  }
}
