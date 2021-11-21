import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('refresh_tokens')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user?: UserEntity;

  @Column({ type: 'text' })
  refreshToken: string;

  constructor(userId: number, refreshToken: string) {
    this.userId = userId;
    this.refreshToken = refreshToken;
  }
}
