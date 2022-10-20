import { RoomStatus } from './../../common/enums/room.enum';
import {
  IsString,
  MaxLength,
  IsArray,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';

export class CreateRoomDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  description: string;

  @IsOptional()
  @IsString()
  quantity: number;

  @IsOptional()
  @IsString()
  price: number;

  @IsOptional()
  @IsArray()
  images: string[];

  @IsOptional()
  @IsArray()
  publicIds: string[];

  @IsOptional()
  @IsString()
  typeId: string;

  @IsOptional()
  @IsString()
  hotelId: string;

  @IsOptional()
  @IsEnum(RoomStatus)
  status: RoomStatus;
}

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  description: string;

  @IsOptional()
  @IsString()
  quantity: number;

  @IsOptional()
  @IsString()
  price: number;

  @IsOptional()
  @IsArray()
  images: string[];

  @IsOptional()
  @IsArray()
  publicIds: string[];

  @IsOptional()
  @IsString()
  typeId: string;

  @IsOptional()
  @IsString()
  hotelId: string;

  @IsOptional()
  @IsEnum(RoomStatus)
  status: RoomStatus;
}

export class FindRoomDto {
  @IsOptional()
  @IsDateString()
  checkInDate: string;

  @IsOptional()
  @IsDateString()
  checkOutDate: string;
}
