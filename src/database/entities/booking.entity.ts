import { User } from './user.entity';
import { AbstractEntity } from 'src/common/abstract/entity.abstract';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BookingStatus } from '../../common/enums/booking.enum';
import { BookingDetail } from './booking-detail.entity';
import { Customer } from './customer.entity';

@Entity('t_booking')
export class Booking extends AbstractEntity {
  @Column({ type: 'date' })
  checkInDate: string;

  @Column({ type: 'date' })
  checkOutDate: string;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.UNPAID,
  })
  bookingStatus: BookingStatus;

  @OneToMany(() => BookingDetail, (bookingDetail) => bookingDetail.booking)
  bookingDetails: BookingDetail[];

  @ManyToOne(() => Customer, (customer) => customer.bookings)
  customer: Customer;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;
}
