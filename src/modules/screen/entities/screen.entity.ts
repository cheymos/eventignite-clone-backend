import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { EventEntity } from '../../event/entities/event.entity';
import { PlaylistEntity } from '../../playlist/entities/playlist.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('screens')
export class ScreenEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => EventEntity, { onDelete: 'CASCADE' })
  event?: EventEntity;

  @Column()
  eventId: number;

  @OneToOne(() => PlaylistEntity, (playlistEntity) => playlistEntity.screen)
  @JoinColumn()
  playlist?: PlaylistEntity;

  @Column()
  playlistId: number;

  @ManyToOne(() => UserEntity)
  owner: UserEntity;

  @Column()
  ownerId: number;

  constructor(
    name: string,
    description: string,
    eventId: number,
    playlistId: number,
    ownerId: number,
  ) {
    this.name = name;
    this.description = description;
    this.eventId = eventId;
    this.playlistId = playlistId;
    this.ownerId = ownerId;
  }
}
