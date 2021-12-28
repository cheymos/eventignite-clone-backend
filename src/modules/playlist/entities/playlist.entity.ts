import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ScreenEntity } from '../../screen/entities/screen.entity';

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

  @ApiProperty()
  @Column()
  ownerId: string;

  @ApiProperty()
  @OneToOne(() => ScreenEntity, (screenEntity) => screenEntity.playlist, {
    eager: true,
  })
  @JoinColumn()
  screen: ScreenEntity;

  constructor(name: string, description: string, ownerId: string) {
    this.name = name;
    this.description = description;
    this.ownerId = ownerId;
  }
}
