import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContentVariantEntity } from '../../content-variant/entities/content-variant.entity';

@Entity('content_properties')
export class ContentPropertyEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  property: string;

  @Column()
  value: string;

  @ManyToOne(() => ContentVariantEntity, { onDelete: 'CASCADE' })
  contentVariant?: ContentVariantEntity;

  @Column()
  contentVariantId: number;

  constructor(property: string, value: string, contentVariantId: number) {
    this.property = property;
    this.value = value;
    this.contentVariantId = contentVariantId;
  }
}
