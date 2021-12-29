import { ForbiddenException, Injectable } from '@nestjs/common';
import { NO_ACCESS_CONTENT } from '../../common/constants/error.constants';
import { ContentRepository } from './content.repository';
import { ContentDto } from './dtos/content.dto';
import { ContentEntity } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(private readonly contentRepository: ContentRepository) {}

  async create({ type }: ContentDto, userId: string): Promise<ContentEntity> {
    const newContent = new ContentEntity(type, userId);

    return this.contentRepository.save(newContent);
  }

  async getOne(contentId: number): Promise<ContentEntity> {
    const content = await this.contentRepository.findOneOrException(contentId);

    return content;
  }

  async update(
    contentId: number,
    { type }: ContentDto,
  ): Promise<ContentEntity> {
    const content = await this.contentRepository.findOneOrException(contentId);

    Object.assign(content, { type });

    return this.contentRepository.save(content);
  }

  async delete(contentId: number): Promise<void> {
    const content = await this.contentRepository.findOneOrException(contentId);

    await this.contentRepository.delete(content);
  }

  checkAccess(content: ContentEntity, userId: string): void {
    const isAllow = content.ownerId === userId;

    if (!isAllow) throw new ForbiddenException(NO_ACCESS_CONTENT);
  }
}
