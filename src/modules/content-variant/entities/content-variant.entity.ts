import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContentEntity } from '../../content/entities/content.entity';

export enum ContentType {
  Video = 'video',
  Audio = 'audio',
  Picture = 'picture',
  Html = 'html',
}

@Entity('content_variants')
export class ContentVariantEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column('text')
  body: string;

  @ManyToOne(() => ContentEntity, { onDelete: 'CASCADE' })
  content?: ContentEntity;

  @ApiProperty()
  @Column()
  contentId: number;

  constructor(body: string, contentId: number) {
    this.body = body;
    this.contentId = contentId;
  }
}
