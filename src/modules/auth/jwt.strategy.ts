import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: ExtractJwt.fromHeader('jwt'),
      secretOrKey: process.env.SECRET,
    });
  }

  async validate({ sub }) {
    const userId = sub;
    const { roles, permissions } = await this.userRepository.getUserRoleById(
      userId,
    );
    return { id: userId, roles, permissions };
  }
}
