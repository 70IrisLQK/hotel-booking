import { Booking } from './../../database/entities/booking.entity';
import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, UserAuth } from '../../core/decorators';
import { PermissionEnum } from './../../common/enums/permission.enum';
import {
  CreateBookingDto,
  CustomerUpdateBookingDto,
  UpdateBookingDto,
} from './booking.dto';
import { BookingService } from './booking.service';
import { UserJwtDto } from '../auth/auth.dto';

@Controller('bookings')
@ApiTags('bookings')
@ApiBearerAuth('jwt')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Auth(PermissionEnum.USER)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    type: Booking,
  })
  @Post('')
  public async createBooking(
    @UserAuth() userAuth: UserJwtDto,
    @Body() payload: CreateBookingDto,
  ) {
    return this.bookingService.createBooking(userAuth, payload);
  }

  @Auth(PermissionEnum.USER)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: Booking,
  })
  @Put('/:id')
  public async updateBooking(
    @Param('id') bookingId: string,
    @Body() payload: UpdateBookingDto,
  ) {
    return this.bookingService.updateBooking(bookingId, payload);
  }

  @Auth(PermissionEnum.USER)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: Booking,
  })
  @Put('/:id/customer')
  public async customerUpdateBooking(
    @Param('id') bookingId: string,
    @Body() payload: CustomerUpdateBookingDto,
  ) {
    return this.bookingService.customerUpdateBooking(bookingId, payload);
  }
}
