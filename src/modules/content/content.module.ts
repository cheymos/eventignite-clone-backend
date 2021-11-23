import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentEntity } from './entities/content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentEntity])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
