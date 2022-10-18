import { Repository, EntityRepository } from 'typeorm';
import { Booking } from '../../database/entities';

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {}
