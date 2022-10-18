import { Module } from '@nestjs/common';
import { BookingDetailController } from './booking-detail.controller';
import { BookingDetailService } from './booking-detail.service';

@Module({
  controllers: [BookingDetailController],
  providers: [BookingDetailService],
})
export class BookingDetailModule {}
