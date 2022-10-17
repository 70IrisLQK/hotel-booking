import { AbstractEntity } from 'src/common/abstract/entity.abstract';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { Room } from './room.entity';

@Entity('t_hotel')
export class Hotel extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  email: number;

  @Column()
  price: number;

  @OneToMany(() => Room, (room) => room.hotel)
  @JoinTable()
  rooms: Room[];
}
