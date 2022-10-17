import { AbstractEntity } from 'src/common/abstract/entity.abstract';
import { Column, Entity, OneToMany } from 'typeorm';
import { Booking } from './booking.entity';

@Entity('t_customer')
export class Customer extends AbstractEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToMany(() => Booking, (booking) => booking.customer)
  bookings: Booking[];
}
