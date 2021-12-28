import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CONTENT_VARIANT_NOT_FOUND } from '../../common/constants/error.constants';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { ContentRepository } from '../content/content.repository';
import { ContentService } from '../content/content.service';
import { FileService } from '../file/file.service';
import { ContentVariantEntity } from './entities/content-variant.entity';

@Injectable()
export class ContentVariantService {
  constructor(
    @InjectRepository(ContentVariantEntity)
    private readonly contentVariantRepository: Repository<ContentVariantEntity>,
    private readonly contentService: ContentService,
    private readonly contentRepository: ContentRepository,
    private readonly fileService: FileService,
  ) {}

  async create(
    filename: string,
    dataBuffer: Buffer,
    contentId: number,
    userId: string,
  ): Promise<ContentVariantEntity> {
    const content = await this.contentRepository.findOneById(contentId);
    this.contentService.checkAccess(content, userId);

    const file = await this.fileService.upload(dataBuffer, filename);
    const newContentVariant = new ContentVariantEntity(file, contentId);

    return this.contentVariantRepository.save(newContentVariant);
  }

  async getOne(
    contentVariantId: number,
    contentId: number,
    userId: string,
  ): Promise<ContentVariantEntity> {
    const content = await this.contentRepository.findOneById(contentId);
    this.contentService.checkAccess(content, userId);

    const contentVariant = await this.findOne(contentVariantId);

    if (contentVariant.contentId !== content.id)
      throw new NotFoundException(CONTENT_VARIANT_NOT_FOUND);

    return contentVariant;
  }

  async getAllVariants(
    contentId: number,
    userId: string,
  ): Promise<PaginateResponse<ContentVariantEntity>> {
    const content = await this.contentRepository.findOneById(contentId);

    this.contentService.checkAccess(content, userId);

    const [data, total] = await this.contentVariantRepository.findAndCount({
      contentId,
    });

    return { data, total };
  }

  async update(
    filename: string,
    dataBuffer: Buffer,
    contentVariantId: number,
    contentId: number,
    userId: string,
  ): Promise<void> {
    const content = await this.contentRepository.findOneById(contentId);
    this.contentService.checkAccess(content, userId);

    const contentVariant = await this.findOne(contentVariantId);

    if (contentVariant.contentId !== content.id)
      throw new NotFoundException(CONTENT_VARIANT_NOT_FOUND);

    const file = await this.fileService.upload(dataBuffer, filename);
    const newContentVariant = new ContentVariantEntity(file, contentId);

    await this.contentVariantRepository.update(
      { id: contentVariantId },
      newContentVariant,
    );
  }

  async delete(
    contentVariantId: number,
    contentId: number,
    userId: string,
  ): Promise<void> {
    const content = await this.contentRepository.findOneById(contentId);
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
