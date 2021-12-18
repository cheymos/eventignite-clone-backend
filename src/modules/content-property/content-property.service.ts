import {
  ImATeapotException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CONTENT_VARIANT_NOT_FOUND } from '../../common/constants/error.constants';
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
    const content = await this.contentService.findOne(contentId);
    this.contentService.checkAccess(content, userId);

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
    const content = await this.contentService.findOne(contentId);
    this.contentService.checkAccess(content, userId);

    const [data, total] = await this.contentPropertyRepository.findAndCount({
      contentVariantId,
    });

    return { data, total };
  }
}
