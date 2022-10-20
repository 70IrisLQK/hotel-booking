import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoomStatus } from '../../common/enums/room.enum';
import { RoomException } from '../../common/exceptions/room.exception';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { BookingDetail } from './../../database/entities/booking-detail.entity';
import { CreateRoomDto, FindRoomDto } from './room.dto';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService {
  constructor(
    private roomRepository: RoomRepository,
    private cloudinaryService: CloudinaryService,
  ) {}
  public async getAllRoom() {
    const rooms = await this.roomRepository.find();

    if (!rooms) throw new RoomException('NOT_FOUND_ROOM', HttpStatus.NOT_FOUND);

    return { status: 'success', statusCode: '200', data: rooms };
  }

  public async getAvailableRoom(payload: FindRoomDto) {
    const { checkInDate, checkOutDate } = payload;
    const query = await this.roomRepository.createQueryBuilder('room');

    if (checkInDate && checkOutDate) {
      query.where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from(BookingDetail, 'bookingDetail')
          .innerJoin('bookingDetail.booking', 'booking')
          .where('bookingDetail.roomId = room.id')
          .andWhere(' booking.checkInDate < :checkOutDate', {
            checkOutDate: checkOutDate,
          })
          .andWhere('booking.checkOutDate > :checkInDate ', {
            checkInDate: checkInDate,
          })
          .getQuery();
        return 'NOT EXISTS ' + subQuery;
      });
    }

    query
      .andWhere('room.status = :status', { status: RoomStatus.AVAILABLE })
      .andWhere('room.quantity > :quantity', { quantity: 0 });

    const result = await query.getMany();
    return { status: 'success', statusCode: '200', data: result };
  }

  public async getRoomByID(roomId: string) {
    const room = await this.roomRepository.findOne({ id: roomId });

    if (!room) throw new RoomException('NOT_FOUND_ROOM', HttpStatus.NOT_FOUND);

    return { status: 'success', statusCode: '201', data: room };
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
          throw new RoomException('INVALID_FILE_TYPE', HttpStatus.BAD_REQUEST);
        });
      urls.push(newPath.url);
      publicIds.push(newPath.public_id);
    }
    payload.images = urls;
    payload.publicIds = publicIds;
    payload.price = Number(payload.price);
    payload.quantity = Number(payload.quantity);

    const newRoom = await this.roomRepository.save(payload);
    return { status: 'success', statusCode: '201', data: newRoom };
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
            throw new RoomException(
              'INVALID_FILE_TYPE',
              HttpStatus.BAD_REQUEST,
            );
          });
        urls.push(newPath.url);
      }
      payload.images = urls;
    }

    const updatedRoom = await this.roomRepository.save({ ...data, ...payload });
    return { status: 'success', statusCode: '200', data: updatedRoom };
  }

  public async deleteRoom(roomId: string) {
    const deleteResponse = await this.roomRepository.softDelete(roomId);
    if (!deleteResponse.affected) {
      throw new RoomException('NOT_FOUND_ROOM', HttpStatus.NOT_FOUND);
    }
    const result = await this.roomRepository.findOne(roomId, {
      withDeleted: true,
    });
    return { status: 'success', statusCode: '200', data: result };
  }
}
