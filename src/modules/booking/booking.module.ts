import { BookingDetailRepository } from './../booking-detail/booking-detail.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingRepository } from './booking.repository';
import { RoomRepository } from '../room/room.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookingRepository,
      BookingDetailRepository,
      RoomRepository,
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
