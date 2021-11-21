import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';

@Module({
  providers: [ScreenService],
  controllers: [ScreenController]
})
export class ScreenModule {}
