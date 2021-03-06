import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from '../content/content.module';
import { ContentPropertyController } from './content-property.controller';
import { ContentPropertyService } from './content-property.service';
import { ContentPropertyRepository } from './contnet-property.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentPropertyRepository]),
    ContentModule,
  ],
  controllers: [ContentPropertyController],
  providers: [ContentPropertyService],
})
export class ContentPropertyModule {}
