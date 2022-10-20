import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthException } from '../../common/exceptions/auth.exceptions';
import { UserRepository } from '../user/user.repository';
import { UserLoginDto, UserRegisterDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async userLogin(payload: UserLoginDto) {
    try {
      const user = await this.userRepository.findOne({
        email: payload.email,
      });

      const isPasswordMatch = await user.isPasswordMatch(payload.password);

      if (!isPasswordMatch) {
        throw new AuthException(
          'WRONG_CREDENTIALS_PROVIDED',
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        expiresIn: process.env.EXPIRES_IN,
        accessToken: await this.jwtService.signAsync(
          { sub: user.id },
          {
            expiresIn: process.env.EXPIRES_IN,
            secret: process.env.SECRET,
          },
        ),
        refreshToken: await this.jwtService.signAsync(
          { sub: user.id },
          {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
            secret: process.env.REFRESH_TOKEN_SECRET,
          },
        ),
      };
    } catch (error) {
      throw new AuthException(
        'WRONG_CREDENTIALS_PROVIDED',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async userRegister(payload: UserRegisterDto) {
    try {
      const user = await this.userRepository.findOne({
        email: payload.email,
      });

      if (user) {
        throw new AuthException('EMAIL_EXISTED', HttpStatus.CONFLICT);
      }

      const isPasswordHashed = await bcrypt.hashSync(payload.password, 10);
      payload.password = isPasswordHashed;

      const newUser = await this.userRepository.save(payload);
      return {
        expiresIn: process.env.EXPIRES_IN,
        accessToken: await this.jwtService.signAsync(
          { sub: newUser.id },
          {
            expiresIn: process.env.EXPIRES_IN,
            secret: process.env.SECRET,
          },
        ),
        refreshToken: await this.jwtService.signAsync(
          { sub: newUser.id },
          {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
            secret: process.env.REFRESH_TOKEN_SECRET,
          },
        ),
      };
    } catch (error) {
      throw new AuthException(
        'WRONG_CREDENTIALS_PROVIDED',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
