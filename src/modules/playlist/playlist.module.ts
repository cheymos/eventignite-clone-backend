import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from '../content/content.module';
import { PlaylistContentController } from './controllers/playlist-content.controller';
import { PlaylistController } from './controllers/playlist.controller';
import { PlaylistContentEntity } from './entities/playlist-content.entity';
import { PlaylistRepository } from './repositories/playlist.repository';
import { PlaylistContentService } from './services/playlist-content.service';
import { PlaylistService } from './services/playlist.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlaylistContentEntity,
      PlaylistRepository,
    ]),
    ContentModule,
  ],
  providers: [PlaylistService, PlaylistContentService],
  exports: [PlaylistService, TypeOrmModule.forFeature([PlaylistRepository])],
  controllers: [PlaylistController, PlaylistContentController],
})
export class PlaylistModule {}
