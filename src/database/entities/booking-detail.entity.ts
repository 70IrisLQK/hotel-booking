import { AbstractEntity } from 'src/common/abstract/entity.abstract';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Booking } from './booking.entity';
import { Room } from './room.entity';

@Entity('m_customer_booking')
export class BookingDetail extends AbstractEntity {
  @Column()
  price: number;

  @ManyToOne(() => Room, (room) => room.bookingDetails)
  room: Room;

  @ManyToOne(() => Booking, (booking) => booking.bookingDetails)
  booking: Booking;
}
