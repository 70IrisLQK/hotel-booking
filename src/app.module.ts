import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookingDetailModule } from './modules/booking-detail/booking-detail.module';
import { BookingModule } from './modules/booking/booking.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { RoleModule } from './modules/role/role.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [
    CommonModule,
    RoomModule,
    CloudinaryModule,
    BookingModule,
    BookingDetailModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
