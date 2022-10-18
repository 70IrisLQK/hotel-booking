import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './../user/user.repository';
import { UserLoginDto, UserRegisterDto } from './auth.dto';
import { hash } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async userLogin(payload: UserLoginDto) {
    const { email, password } = payload;

    const isUser = await this.userRepository.findOne({ email: email });

    if (!isUser)
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );

    const isPasswordMatch = await isUser.isPasswordMatch(password);

    if (!isPasswordMatch) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      expiresIn: process.env.EXPIRES_IN,
      accessToken: await this.jwtService.signAsync(
        { sub: isUser.id },
        {
          expiresIn: process.env.EXPIRES_IN,
          secret: process.env.SECRET,
        },
      ),
      refreshToken: await this.jwtService.signAsync(
        { sub: isUser.id },
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
          secret: process.env.REFRESH_TOKEN_SECRET,
        },
      ),
    };
  }

  public async userRegister(payload: UserRegisterDto) {
    const isPasswordHash = await hash(payload.password, 10);
    payload.password = isPasswordHash;
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
  }
}
