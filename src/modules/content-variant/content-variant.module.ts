import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentVariantService } from './content-variant.service';
import { ContentVariantEntity } from './entities/content-variant.entity';
import { ContentVariantController } from './content-variant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContentVariantEntity])],
  providers: [ContentVariantService],
  controllers: [ContentVariantController],
})
export class ContentVariantModule {}
