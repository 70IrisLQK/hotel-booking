import { HttpStatus, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { RoomStatus } from '../../common/enums/room.enum';
import { BookingException } from '../../common/exceptions/booking.exceptions';
import { UserJwtDto } from '../auth/auth.dto';
import { UserRepository } from '../user/user.repository';
import { BookingDetailRepository } from './../booking-detail/booking-detail.repository';
import { RoomRepository } from './../room/room.repository';
import {
  CreateBookingDto,
  CustomerUpdateBookingDto,
  UpdateBookingDto,
} from './booking.dto';
import { BookingRepository } from './booking.repository';

@Injectable()
export class BookingService {
  constructor(
    private bookingRepository: BookingRepository,
    private bookingDetailRepository: BookingDetailRepository,
    private roomRepository: RoomRepository,
    private userRepository: UserRepository,
  ) {}

  public async createBooking(userAuth: UserJwtDto, payload: CreateBookingDto) {
    const { roomItems, checkInDate, checkOutDate } = payload;

    const user = await this.userRepository.findOne(userAuth.id);

    const newBooking = await this.bookingRepository.save({
      user: user,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });

    const bookingDetail = await Promise.all(
      _.map(roomItems, async (item) => {
        const room = await this.roomRepository.findOne(item.id);

        // Update stock
        await this.roomRepository.update(item.id, {
          quantity:
            room.quantity > item.quantity
              ? room.quantity - item.quantity
              : room.quantity,
          status:
            room.quantity === 0 ? RoomStatus.UNAVAILABLE : RoomStatus.AVAILABLE,
        });

        return {
          booking: newBooking.id,
          room: item.id,
          price: item.price,
          quantity: item.quantity,
        };
      }),
    );
    if (bookingDetail) {
      await this.bookingDetailRepository.bulkCreate(bookingDetail);
    }

    const result = await this.bookingRepository.findOne(
      { id: newBooking.id },
      { relations: ['user'] },
    );
    return { status: 'success', statusCode: '200', data: result };
  }

  public async updateBooking(bookingId: string, payload: UpdateBookingDto) {
    const { data } = await this.getBookingById(bookingId);
    const updatedBooking = await this.bookingRepository.save({
      ...data,
      ...payload,
    });
    return { status: 'success', statusCode: '200', data: updatedBooking };
  }

  public async customerUpdateBooking(
    bookingId: string,
    payload: CustomerUpdateBookingDto,
  ) {
    const { checkInDate } = payload;
    const query = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.checkInDate > :checkInDate', {
        checkInDate: checkInDate,
      })
      .andWhere('booking.id = :id', { id: bookingId })
      .getOne();

    if (query) {
      const updatedBooking = await this.bookingRepository.save({
        ...query,
        ...payload,
      });
      return { status: 'success', statusCode: '200', data: updatedBooking };
    } else {
      throw new BookingException(
        'CAN_NOT_EDIT_ANY_BOOKING_BEFORE_START_DATE',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getBookingById(bookingId: string) {
    const booking = await this.bookingRepository.findOne(bookingId);

    if (!booking)
      throw new BookingException('NOT_FOUND_BOOKING', HttpStatus.NOT_FOUND);

    return { status: 'success', statusCode: '200', data: booking };
  }
}
