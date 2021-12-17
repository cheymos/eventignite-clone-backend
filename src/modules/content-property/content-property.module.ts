import { Module } from '@nestjs/common';
import { ContentPropertyController } from './content-property.controller';
import { ContentPropertyService } from './content-property.service';

@Module({
  controllers: [ContentPropertyController],
  providers: [ContentPropertyService]
})
export class ContentPropertyModule {}
