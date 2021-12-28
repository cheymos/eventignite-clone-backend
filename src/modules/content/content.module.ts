import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './content.controller';
import { ContentRepository } from './content.repository';
import { ContentService } from './content.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository])],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService, TypeOrmModule.forFeature([ContentRepository])],
})
export class ContentModule {}
