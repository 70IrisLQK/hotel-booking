import { UserLoginDto, UserRegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  public async userLogin(@Body() payload: UserLoginDto) {
    return this.authService.userLogin(payload);
  }

  @Post('/register')
  public async userRegister(@Body() payload: UserRegisterDto) {
    return this.authService.userRegister(payload);
  }
}
