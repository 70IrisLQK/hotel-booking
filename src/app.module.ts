import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from './common/common.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { RoomModule } from './modules/room/room.module';
import { BookingModule } from './modules/booking/booking.module';
import { BookingDetailModule } from './modules/booking-detail/booking-detail.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';

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
    AuthModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
