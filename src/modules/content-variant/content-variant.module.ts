import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from '../content/content.module';
import { FileModule } from '../file/file.module';
import { ContentVariantController } from './content-variant.controller';
import { ContentVariantRepository } from './content-variant.repository';
import { ContentVariantService } from './content-variant.service';
import { ContentVariantEntity } from './entities/content-variant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentVariantEntity, ContentVariantRepository]),
    ContentModule,
    FileModule,
  ],
  providers: [ContentVariantService],
  controllers: [ContentVariantController],
})
export class ContentVariantModule {}
