import {
  ImATeapotException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CONTENT_PROPERTY_NOT_FOUND,
  CONTENT_VARIANT_NOT_FOUND
} from '../../common/constants/error.constants';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { ContentService } from '../content/content.service';
import { ContentPropertyDto } from './dtos/content-property.dto';
import { ContentPropertyEntity } from './entities/content-property.entity';

@Injectable()
export class ContentPropertyService {
  constructor(
    @InjectRepository(ContentPropertyEntity)
    private readonly contentPropertyRepository: Repository<ContentPropertyEntity>,
    private readonly contentService: ContentService,
  ) {}

  async create(
    { property, value }: ContentPropertyDto,
    contentId: number,
    contentVariantId: number,
    userId: number,
  ): Promise<ContentPropertyEntity> {
    this.checkAccessToContent(contentId, userId);

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
    contentId: number,
    contentVariantId: number,
    userId: number,
  ): Promise<PaginateResponse<ContentPropertyEntity>> {
    this.checkAccessToContent(contentId, userId);

    const [data, total] = await this.contentPropertyRepository.findAndCount({
      contentVariantId,
    });

    return { data, total };
  }

  async update(
    contentPropertyId: number,
    { property, value }: ContentPropertyDto,
    contentId: number,
    contentVariantId: number,
    userId: number,
  ): Promise<void> {
    this.checkAccessToContent(contentId, userId);

    const contentProperty = await this.findOne(contentPropertyId);

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
    contentId: number,
    contentVariantId: number,
    userId: number,
  ): Promise<void> {
    this.checkAccessToContent(contentId, userId);

    const contentProperty = await this.findOne(contentPropertyId);

    if (contentProperty.contentVariantId !== contentVariantId)
      throw new NotFoundException(CONTENT_PROPERTY_NOT_FOUND);

    await this.contentPropertyRepository.remove(contentProperty);
  }

  async findOne(contentPropertyId: number): Promise<ContentPropertyEntity> {
    const contentProperty = await this.contentPropertyRepository.findOne(
      contentPropertyId,
    );

    if (!contentProperty)
      throw new NotFoundException(CONTENT_PROPERTY_NOT_FOUND);

    return contentProperty;
  }

  private async checkAccessToContent(
    contentId: number,
    userId: number,
  ): Promise<void> {
    const content = await this.contentService.findOne(contentId);
    this.contentService.checkAccess(content, userId);
  }
}
