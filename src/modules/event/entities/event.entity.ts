import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  owner?: UserEntity;

  @Column()
  ownerId: number;

  constructor(name: string, description: string, ownerId: number) {
    this.name = name;
    this.description = description;
    this.ownerId = ownerId;
  }
}
