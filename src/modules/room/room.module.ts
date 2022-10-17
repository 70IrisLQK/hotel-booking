import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomRepository } from './room.repository';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository]), CloudinaryModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
