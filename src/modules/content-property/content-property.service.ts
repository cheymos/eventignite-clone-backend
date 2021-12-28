import {
  ImATeapotException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import {
  CONTENT_PROPERTY_NOT_FOUND,
  CONTENT_VARIANT_NOT_FOUND
} from '../../common/constants/error.constants';
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

    try {
      const contnetProperty = await this.contentPropertyRepository.save(
        newContentProperty,
      );

      return contnetProperty;
    } catch (e: any) {
      if (e.code === '23503')
        throw new NotFoundException(CONTENT_VARIANT_NOT_FOUND);

      throw new ImATeapotException(e);
    }
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
  ): Promise<void> {

    const contentProperty = await this.contentPropertyRepository.findOneById(
      contentPropertyId,
    );

    if (contentProperty.contentVariantId !== contentVariantId)
      throw new NotFoundException(CONTENT_PROPERTY_NOT_FOUND);

    const newContentProperty = new ContentPropertyEntity(
      property,
      value,
      contentVariantId,
    );

    await this.contentPropertyRepository.update(
      { id: contentPropertyId },
      newContentProperty,
    );
  }

  async delete(
    contentPropertyId: number,
    contentVariantId: number,
  ): Promise<void> {
    const contentProperty = await this.contentPropertyRepository.findOneById(
      contentPropertyId,
    );

    if (contentProperty.contentVariantId !== contentVariantId)
      throw new NotFoundException(CONTENT_PROPERTY_NOT_FOUND);

    await this.contentPropertyRepository.remove(contentProperty);
  }
}
