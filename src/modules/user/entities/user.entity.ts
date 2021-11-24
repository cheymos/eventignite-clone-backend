import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 36, unique: true })
  username: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254, unique: true })
  email: string;

  @ApiProperty()
  @Column('text', { select: false })
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
