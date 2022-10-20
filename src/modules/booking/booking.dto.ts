import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { BookingStatus } from '../../common/enums/booking.enum';
import { Room } from '../../database/entities';

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Room)
  roomItems: Room[];

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  checkInDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  checkOutDate: string;
}

export class UpdateBookingDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(BookingStatus)
  bookingStatus: BookingStatus;

  @ApiProperty()
  @IsOptional()
  @Type(() => Room)
  roomItems: Room[];

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  checkInDate: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  checkOutDate: string;
}

export class CustomerUpdateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  checkInDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  checkOutDate: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Room)
  roomItems: Room[];
}
