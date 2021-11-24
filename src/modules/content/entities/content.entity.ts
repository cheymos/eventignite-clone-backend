import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty({ enum: ContentType, enumName: 'ContentType' })
  @Column({ type: 'enum', enum: ContentType })
  type: ContentType;

  @ApiProperty()
  @Column('text')
  body: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  owner?: UserEntity;

  @ApiProperty()
  @Column()
  ownerId: number;

  constructor(type: ContentType, body: string, ownerId: number) {
    this.type = type;
    this.body = body;
    this.ownerId = ownerId;
  }
}
