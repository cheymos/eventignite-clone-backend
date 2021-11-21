import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'varchar', length: 36, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 254, unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
