import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { PlaylistModule } from '../playlist/playlist.module';
import { ScreenController } from './screen.controller';
import { ScreenRepository } from './screen.repository';
import { ScreenService } from './screen.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScreenRepository]),
    EventModule,
    PlaylistModule,
  ],
  providers: [ScreenService],
  controllers: [ScreenController],
})
export class ScreenModule {}
