import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ScreenEntity } from '../../screen/entities/screen.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('playlists')
export class PlaylistEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  owner?: UserEntity;

  @ApiProperty()
  @Column()
  ownerId: number;

  @OneToOne(() => ScreenEntity, (screenEntity) => screenEntity.playlist)
  screen?: ScreenEntity;

  constructor(name: string, description: string, ownerId: number) {
    this.name = name;
    this.description = description;
    this.ownerId = ownerId;
  }
}
