import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentPropertyController } from './content-property.controller';
import { ContentPropertyService } from './content-property.service';
import { ContentPropertyEntity } from './entities/content-property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentPropertyEntity])],
  controllers: [ContentPropertyController],
  providers: [ContentPropertyService],
})
export class ContentPropertyModule {}
