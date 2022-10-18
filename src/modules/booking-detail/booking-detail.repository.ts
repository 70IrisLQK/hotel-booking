import { BookingDetail } from './../../database/entities/booking-detail.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(BookingDetail)
export class BookingDetailRepository extends Repository<BookingDetail> {
  async bulkCreate(data) {
    await this.createQueryBuilder().insert().values(data).execute();
    return true;
  }
}
