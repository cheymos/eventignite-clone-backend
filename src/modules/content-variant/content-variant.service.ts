import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentService } from '../content/content.service';
import { ContentVariantDto } from './dtos/content-variant.dto';
import { ContentVariantEntity } from './entities/content-variant.entity';

@Injectable()
export class ContentVariantService {
  constructor(
    @InjectRepository(ContentVariantEntity)
    private readonly contentVariantRepository: Repository<ContentVariantEntity>,
    private readonly contentService: ContentService,
  ) {}

  async create(
    { body }: ContentVariantDto,
    contentId: number,
    userId: number,
  ): Promise<ContentVariantEntity> {
    const content = await this.contentService.findOne(contentId);
    this.contentService.checkAccess(content, userId);

    const newContentVariant = new ContentVariantEntity(body, contentId);

    return this.contentVariantRepository.save(newContentVariant);
  }
}
