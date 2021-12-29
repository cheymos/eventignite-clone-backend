import { Injectable, NotFoundException } from '@nestjs/common';
import { CONTENT_PROPERTY_NOT_FOUND } from '../../common/constants/error.constants';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { ContentRepository } from '../content/content.repository';
import { ContentService } from '../content/content.service';
import { ContentPropertyRepository } from './contnet-property.repository';
import { ContentPropertyDto } from './dtos/content-property.dto';
import { ContentPropertyEntity } from './entities/content-property.entity';

@Injectable()
export class ContentPropertyService {
  constructor(
    private readonly contentPropertyRepository: ContentPropertyRepository,
    private readonly contentService: ContentService,
    private readonly contentRepository: ContentRepository,
  ) {}

  async create(
    { property, value }: ContentPropertyDto,
    contentVariantId: number,
  ): Promise<ContentPropertyEntity> {
    const newContentProperty = new ContentPropertyEntity(
      property,
      value,
      contentVariantId,
    );

    return this.contentPropertyRepository.save(newContentProperty);
  }

  async getAll(
    contentVariantId: number,
  ): Promise<PaginateResponse<ContentPropertyEntity>> {
    const [data, total] = await this.contentPropertyRepository.findAndCount({
      contentVariantId,
    });

    return { data, total };
  }

  async update(
    contentPropertyId: number,
    { property, value }: ContentPropertyDto,
    contentVariantId: number,
  ): Promise<ContentPropertyEntity> {
    const contentProperty = await this.contentPropertyRepository.findOneOrException({
      contentVariantId,
      id: contentPropertyId,
    });

    Object.assign(contentProperty, {
      property,
      value,
      contentVariantId,
    });

    return this.contentPropertyRepository.save(contentProperty);
  }

  async delete(
    contentPropertyId: number,
    contentVariantId: number,
  ): Promise<void> {
    const contentProperty = await this.contentPropertyRepository.findOneOrException(
      contentPropertyId,
    );

    if (contentProperty.contentVariantId !== contentVariantId)
      throw new NotFoundException(CONTENT_PROPERTY_NOT_FOUND);

    await this.contentPropertyRepository.remove(contentProperty);
  }
}
