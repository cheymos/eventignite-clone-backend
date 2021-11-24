import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContentEntity } from '../../content/entities/content.entity';
import { PlaylistEntity } from './playlist.entity';

@Entity('playlists_contents')
export class PlaylistContentEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => PlaylistEntity)
  playlist?: PlaylistEntity;

  @Column()
  playlistId: number;

  @ManyToOne(() => ContentEntity, { onDelete: 'CASCADE' })
  content?: ContentEntity;

  @Column()
  contentId: number;

  @Column('smallint')
  pos: number;

  @Column()
  duration: number;

  constructor(
    playlistId: number,
    contentId: number,
    pos: number,
    duration: number,
  ) {
    this.playlistId = playlistId;
    this.contentId = contentId;
    this.pos = pos;
    this.duration = duration;
  }
}
