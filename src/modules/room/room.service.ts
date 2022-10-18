import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MoreThanOrEqual } from 'typeorm';
import { RoomStatus } from '../../common/enums/room.enum';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateRoomDto } from './room.dto';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService {
  constructor(
    private roomRepository: RoomRepository,
    private cloudinaryService: CloudinaryService,
  ) {}
  public async getAllRoom() {
    const rooms = await this.roomRepository.find();

    if (!rooms) throw new NotFoundException('NOT_FOUND_ROOM');

    return { status: 'success', status_code: '200', data: rooms };
  }

  public async getAvailableRoom() {
    const rooms = await this.roomRepository.find({
      status: RoomStatus.AVAILABLE,
      quantity: MoreThanOrEqual(1),
    });

    if (!rooms) throw new NotFoundException('NOT_FOUND_ROOM');

    return { status: 'success', status_code: '200', data: rooms };
  }

  public async getRoomByID(roomId: string) {
    const room = await this.roomRepository.findOne({ id: roomId });

    if (!room) throw new NotFoundException('NOT_FOUND_ROOM');

    return { status: 'success', status_code: '201', data: room };
  }

  public async createRoom(
    payload: CreateRoomDto,
    images: Array<Express.Multer.File>,
  ) {
    const urls = [];
    const publicIds = [];
    for (const file of images) {
      const newPath = await this.cloudinaryService
        .uploadImage(file)
        .catch(() => {
          throw new BadRequestException('INVALID_FILE_TYPE');
        });
      urls.push(newPath.url);
      publicIds.push(newPath.public_id);
    }
    payload.images = urls;
    payload.publicIds = publicIds;
    payload.price = Number(payload.price);
    payload.quantity = Number(payload.quantity);
    const newRoom = await this.roomRepository.save(payload);
    return { status: 'success', status_code: '201', data: newRoom };
  }

  public async updateRoom(
    roomId: string,
    payload: CreateRoomDto,
    files: Array<Express.Multer.File>,
  ) {
    const urls = [];
    const { data } = await this.getRoomByID(roomId);

    payload.images = data.images;
    payload.price = Number(payload.price);
    payload.quantity = Number(payload.quantity);

    if (files.length > 0) {
      for (const file of files) {
        const newPath = await this.cloudinaryService
          .uploadImage(file)
          .catch(() => {
            throw new BadRequestException('INVALID_FILE_TYPE');
          });
        urls.push(newPath.url);
      }
      payload.images = urls;
    }

    const updatedRoom = await this.roomRepository.save({ ...data, ...payload });
    return { status: 'success', status_code: '200', data: updatedRoom };
  }

  public async deleteRoom(roomId: string) {
    const deleteResponse = await this.roomRepository.softDelete(roomId);
    if (!deleteResponse.affected) {
      throw new NotFoundException('NOT_FOUND_ROOM');
    }
    const result = await this.roomRepository.find({
      where: { id: roomId },
      withDeleted: true,
    });
    return { status: 'success', status_code: '200', data: result };
  }
}
