import { Injectable } from '@nestjs/common';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { FileService } from '../file/file.service';
import { ContentVariantRepository } from './content-variant.repository';
import { ContentVariantEntity } from './entities/content-variant.entity';

@Injectable()
export class ContentVariantService {
  constructor(
    private readonly contentVariantRepository: ContentVariantRepository,
    private readonly fileService: FileService,
  ) {}

  async create(
    filename: string,
    dataBuffer: Buffer,
    contentId: number,
  ): Promise<ContentVariantEntity> {
    const file = await this.fileService.upload(dataBuffer, filename);
    const newContentVariant = new ContentVariantEntity(file, contentId);

    return this.contentVariantRepository.save(newContentVariant);
  }

  async getOne(
    contentVariantId: number,
    contentId: number,
  ): Promise<ContentVariantEntity> {
    const contentVariant =
      await this.contentVariantRepository.findOneOrException({
        id: contentVariantId,
        contentId,
      });

    return contentVariant;
  }

  async getAllVariants(
    contentId: number,
  ): Promise<PaginateResponse<ContentVariantEntity>> {
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
  ): Promise<ContentVariantEntity> {
    const contentVariant =
      await this.contentVariantRepository.findOneOrException({
        id: contentVariantId,
        contentId,
      });

    const file = await this.fileService.upload(dataBuffer, filename);

    Object.assign(contentVariant, { file, contentId });

    return this.contentVariantRepository.save(contentVariant);
  }

  async delete(contentVariantId: number, contentId: number): Promise<void> {
    const contentVariant =
      await this.contentVariantRepository.findOneOrException({
        id: contentVariantId,
        contentId,
      });

    await this.contentVariantRepository.remove(contentVariant);
  }
}
