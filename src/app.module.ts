import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from './common/common.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [
    CommonModule,
    RoomModule,
    MulterModule.register({
      dest: './upload',
    }),
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
