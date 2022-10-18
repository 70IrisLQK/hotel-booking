import { RoomRepository } from './../room/room.repository';
import { BookingDetailRepository } from './../booking-detail/booking-detail.repository';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';
import { BookingRepository } from './booking.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { RoomStatus } from '../../common/enums/room.enum';

@Injectable()
export class BookingService {
  constructor(
    private bookingRepository: BookingRepository,
    private bookingDetailRepository: BookingDetailRepository,
    private roomRepository: RoomRepository,
  ) {}

  public async createBooking(payload: CreateBookingDto) {
    const { roomItems, checkInDate, checkOutDate } = payload;

    console.log(roomItems);

    const newBooking = await this.bookingRepository.save({
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });
    const bookingDetail = await Promise.all(
      _.map(roomItems, async (item) => {
        const room = await this.roomRepository.findOne(item.id);

        // Update stock
        await this.roomRepository.update(item.id, {
          quantity: room.quantity - item.quantity,
          status: RoomStatus.UNAVAILABLE,
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

    const result = await this.bookingRepository.findOne({ id: newBooking.id });
    return { status: 'success', status_code: '200', data: result };
  }

  public async updateBooking(bookingId: string, payload: UpdateBookingDto) {
    const { data } = await this.getBookingById(bookingId);
    const updatedBooking = await this.bookingRepository.save({
      ...data,
      ...payload,
    });
    return { status: 'success', status_code: '200', data: updatedBooking };
  }

  public async getBookingById(bookingId: string) {
    const booking = await this.bookingRepository.findOne(bookingId);

    if (!booking) throw new NotFoundException('NOT_FOUND_BOOKING');

    return { status: 'success', status_code: '200', data: booking };
  }
}
