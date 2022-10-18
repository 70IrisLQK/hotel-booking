import { CreateBookingDto, UpdateBookingDto } from './booking.dto';
import { BookingService } from './booking.service';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post('')
  public async createBooking(@Body() payload: CreateBookingDto) {
    return this.bookingService.createBooking(payload);
  }

  @Put('/:id')
  public async updateBooking(
    @Param() bookingId: string,
    @Body() payload: UpdateBookingDto,
  ) {
    return this.bookingService.updateBooking(bookingId, payload);
  }
}