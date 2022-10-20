import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { BookingStatus } from '../../common/enums/booking.enum';
import { Room } from '../../database/entities';

export class CreateBookingDto {
  @IsNotEmpty()
  @Type(() => Room)
  roomItems: Room[];

  @IsNotEmpty()
  @IsDateString()
  checkInDate: string;

  @IsNotEmpty()
  @IsDateString()
  checkOutDate: string;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  bookingStatus: BookingStatus;

  @IsOptional()
  @Type(() => Room)
  roomItems: Room[];

  @IsOptional()
  @IsDateString()
  checkInDate: string;

  @IsOptional()
  @IsDateString()
  checkOutDate: string;
}

export class CustomerUpdateBookingDto {
  @IsNotEmpty()
  @IsDateString()
  checkInDate: string;

  @IsNotEmpty()
  @IsDateString()
  checkOutDate: string;

  @IsOptional()
  @Type(() => Room)
  roomItems: Room[];
}
