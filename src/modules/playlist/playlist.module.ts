import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity])],
  providers: [PlaylistService],
  exports: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
