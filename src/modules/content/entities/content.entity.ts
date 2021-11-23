import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

export enum ContentType {
  Video = 'video',
  Audio = 'audio',
  Picture = 'picture',
  Html = 'html',
}

@Entity('contents')
export class ContentEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'enum', enum: ContentType })
  type: ContentType;

  @Column('text')
  body: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  owner?: UserEntity;

  @Column()
  ownerId: number;
}
