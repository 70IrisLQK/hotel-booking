import { RoomStatus } from './../../common/enums/room.enum';
import {
  IsString,
  MaxLength,
  IsArray,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  quantity: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  images: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  publicIds: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  typeId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hotelId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(RoomStatus)
  status: RoomStatus;
}

export class UpdateRoomDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  quantity: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  images: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  publicIds: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  typeId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hotelId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(RoomStatus)
  status: RoomStatus;
}

export class FindRoomDto {
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  checkInDate: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  checkOutDate: string;
}
