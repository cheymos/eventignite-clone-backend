import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContentVariantEntity } from '../../content-variant/entities/content-variant.entity';

@Entity('content_properties')
export class ContentPropertyEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column()
  property: string;

  @ApiProperty()
  @Column()
  value: string;

  @ManyToOne(() => ContentVariantEntity, { onDelete: 'CASCADE' })
  contentVariant?: ContentVariantEntity;

  @ApiProperty()
  @Column()
  contentVariantId: number;

  constructor(property: string, value: string, contentVariantId: number) {
    this.property = property;
    this.value = value;
    this.contentVariantId = contentVariantId;
  }
}
