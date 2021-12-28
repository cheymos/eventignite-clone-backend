import { ForbiddenException, Injectable } from '@nestjs/common';
import { NO_ACCESS_CONTENT } from '../../common/constants/error.constants';
import { ContentRepository } from './content.repository';
import { ContentDto } from './dtos/content.dto';
import { ContentEntity } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(private readonly contentRepository: ContentRepository) {}

  async create({ type }: ContentDto, userId: string): Promise<number> {
    const newContent = new ContentEntity(type, userId);
    const { id } = await this.contentRepository.save(newContent);

    return id;
  }

  async getOne(contentId: number): Promise<ContentEntity> {
    const content = await this.contentRepository.findOneById(contentId);

    return content;
  }

  async update(contentId: number, { type }: ContentDto): Promise<void> {
    const content = await this.contentRepository.findOneById(contentId);

    Object.assign(content, { type });
    this.contentRepository.update({ id: content.id }, content);
  }

  async delete(contentId: number): Promise<void> {
    const content = await this.contentRepository.findOneById(contentId);

    await this.contentRepository.delete(content);
  }

  checkAccess(content: ContentEntity, userId: string): void {
    const isAllow = content.ownerId === userId;

    if (!isAllow) throw new ForbiddenException(NO_ACCESS_CONTENT);
  }
}
