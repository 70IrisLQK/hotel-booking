import { EntityRepository, Repository } from 'typeorm';
import { Room } from '../../database/entities';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {}
