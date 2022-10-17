import { AbstractEntity } from 'src/common/abstract/entity.abstract';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { Room } from './room.entity';

@Entity('t_room_type')
export class RoomType extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => Room, (room) => room.type)
  @JoinTable()
  rooms: Room[];
}
