import { BookingDetail } from './booking-detail.entity';
import { Hotel } from './hotel.entity';
import { AbstractEntity } from 'src/common/abstract/entity.abstract';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { RoomStatus } from '../../common/enums/room.enum';
import { RoomType } from './room-type.entity';

@Entity('t_room')
export class Room extends AbstractEntity {
  @Column()
  description: string;

  @Column('simple-array')
  images: string[];

  @Column('simple-array')
  publicIds: string[];

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  price: number;

  @Column({
    type: 'enum',
    enum: RoomStatus,
    default: RoomStatus.AVAILABLE,
  })
  status: RoomStatus;

  @ManyToOne(() => RoomType, (roomType) => roomType.rooms)
  @JoinTable()
  type: RoomType;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  @JoinTable()
  hotel: Hotel;

  @OneToMany(() => BookingDetail, (bookingDetail) => bookingDetail.room)
  @JoinTable()
  bookingDetails: BookingDetail[];
}
