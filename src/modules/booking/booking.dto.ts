import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { BookingStatus } from '../../common/enums/booking.enum';
import { Room } from '../../database/entities';

export class CreateBookingDto {
  @IsOptional()
  roomItems: Room[];

  @IsOptional()
  @IsDateString()
  checkInDate: string;

  @IsOptional()
  @IsDateString()
  checkOutDate: string;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  bookingStatus: BookingStatus;
}

export class CustomerUpdateBookingDto {
  @IsDateString()
  checkInDate: string;
}
