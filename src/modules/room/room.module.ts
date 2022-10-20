import { BookingRepository } from './../booking/booking.repository';
import { BookingDetailRepository } from './../booking-detail/booking-detail.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomRepository } from './room.repository';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomRepository, BookingDetailRepository]),
    CloudinaryModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
