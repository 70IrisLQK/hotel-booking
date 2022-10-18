import { User } from './../../database/entities/user.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
