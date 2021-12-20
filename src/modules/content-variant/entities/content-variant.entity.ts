import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ContentEntity } from '../../content/entities/content.entity';
import { FileEntity } from '../../file/entities/file.entity';

@Entity('content_variants')
export class ContentVariantEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @OneToOne(() => FileEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  file: FileEntity;

  @ManyToOne(() => ContentEntity, { onDelete: 'CASCADE' })
  content?: ContentEntity;

  @ApiProperty()
  @Column()
  contentId: number;

  constructor(file: FileEntity, contentId: number) {
    this.file = file;
    this.contentId = contentId;
  }
}
