import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty()
  @IsString()
  @IsEmail({}, { message: 'validation.email' })
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UserRegisterDto {
  @ApiProperty()
  @IsString()
  @IsEmail({}, { message: 'validation.email' })
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  phone: string;
}
