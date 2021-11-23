import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { PlaylistModule } from '../playlist/playlist.module';
import { ScreenEntity } from './entities/screen.entity';
import { ScreenController } from './screen.controller';
import { ScreenService } from './screen.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScreenEntity]),
    EventModule,
    PlaylistModule,
  ],
  providers: [ScreenService],
  controllers: [ScreenController],
})
export class ScreenModule {}
