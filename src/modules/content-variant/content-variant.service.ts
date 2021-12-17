import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CONTENT_VARIANT_NOT_FOUND } from '../../common/constants/error.constants';
import { PaginateResponse } from '../../common/types/paginate-response.type';
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

  async getOne(
    contentVariantId: number,
    contentId: number,
    userId: number,
  ): Promise<ContentVariantEntity> {
    const content = await this.contentService.findOne(contentId);
    this.contentService.checkAccess(content, userId);

    const contentVariant = await this.findOne(contentVariantId);

    if (contentVariant.contentId !== content.id)
      throw new NotFoundException(CONTENT_VARIANT_NOT_FOUND);

    return contentVariant;
  }

  async getAllVariants(
    contentId: number,
    userId: number,
  ): Promise<PaginateResponse<ContentVariantEntity>> {
    const content = await this.contentService.findOne(contentId);

    this.contentService.checkAccess(content, userId);

    const [data, total] = await this.contentVariantRepository.findAndCount({
      contentId,
    });

    return { data, total };
  }

  async update(
    { body }: ContentVariantDto,
    contentVariantId: number,
    contentId: number,
    userId: number,
  ): Promise<void> {
    const content = await this.contentService.findOne(contentId);
    this.contentService.checkAccess(content, userId);

    const contentVariant = await this.findOne(contentVariantId);

    if (contentVariant.contentId !== content.id)
      throw new NotFoundException(CONTENT_VARIANT_NOT_FOUND);

    const newContentVariant = new ContentVariantEntity(body, contentId);
    await this.contentVariantRepository.update(
      { id: contentVariantId },
      newContentVariant,
    );
  }

  async delete(
    contentVariantId: number,
    contentId: number,
    userId: number,
  ): Promise<void> {
    const content = await this.contentService.findOne(contentId);
    this.contentService.checkAccess(content, userId);

    const contentVariant = await this.findOne(contentVariantId);

    if (contentVariant.contentId !== content.id)
      throw new NotFoundException(CONTENT_VARIANT_NOT_FOUND);

    await this.contentVariantRepository.remove(contentVariant);
  }

  async findOne(contentVariantId: number): Promise<ContentVariantEntity> {
    const contentVariant = await this.contentVariantRepository.findOne(
      contentVariantId,
    );

    if (!contentVariant) throw new NotFoundException(CONTENT_VARIANT_NOT_FOUND);

    return contentVariant;
  }
}
