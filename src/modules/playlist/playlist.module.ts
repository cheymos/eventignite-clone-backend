import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities/playlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity])],
})
export class PlaylistModule {}
