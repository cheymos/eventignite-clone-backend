import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  url: string;

  @Column()
  key: string;

  constructor(url: string, key: string) {
    this.url = url;
    this.key = key;
  }
}
