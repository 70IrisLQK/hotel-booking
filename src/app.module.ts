import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from './common/common.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { RoomModule } from './modules/room/room.module';
import { BookingModule } from './modules/booking/booking.module';
import { BookingDetailModule } from './modules/booking-detail/booking-detail.module';

@Module({
  imports: [
    CommonModule,
    RoomModule,
    MulterModule.register({
      dest: './upload',
    }),
    CloudinaryModule,
    BookingModule,
    BookingDetailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
