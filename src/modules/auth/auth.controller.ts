import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserLoginDto, UserRegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async userLogin(@Body() payload: UserLoginDto) {
    return this.authService.userLogin(payload);
  }

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  async userRegister(@Body() payload: UserRegisterDto) {
    return this.authService.userRegister(payload);
  }
}
