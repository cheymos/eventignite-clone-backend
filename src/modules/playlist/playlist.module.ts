import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from '../content/content.module';
import { PlaylistContentEntity } from './entities/playlist-content.entity';
import { PlaylistEntity } from './entities/playlist.entity';
import { PlaylistContentController } from './controllers/playlist-content.controller';
import { PlaylistContentService } from './services/playlist-content.service';
import { PlaylistController } from './controllers/playlist.controller';
import { PlaylistService } from './services/playlist.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaylistEntity, PlaylistContentEntity]),
    ContentModule,
  ],
  providers: [PlaylistService, PlaylistContentService],
  exports: [PlaylistService],
  controllers: [PlaylistController, PlaylistContentController],
})
export class PlaylistModule {}
