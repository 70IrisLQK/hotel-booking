import { Booking } from './booking.entity';
import bcrypt from 'bcrypt';
import { AbstractEntity } from 'src/common/abstract/entity.abstract';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity('t_user')
export class User extends AbstractEntity {
  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({
    length: 100,
    nullable: true,
    asExpression: 'CONCAT(lastName, firstName)',
  })
  fullname: string;

  @Column({ length: 254, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async isPasswordMatch(password) {
    return bcrypt.compare(password, this.password);
  }
}
