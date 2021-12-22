import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column()
  ownerId: string;

  constructor(type: ContentType, ownerId: string) {
    this.type = type;
    this.ownerId = ownerId;
  }
}
