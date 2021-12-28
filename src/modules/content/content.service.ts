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

  async getOne(contentId: number, userId: string): Promise<ContentEntity> {
    const content = await this.contentRepository.findOneById(contentId);
    this.checkAccess(content, userId);

    return content;
  }

  async update(
    contentId: number,
    { type }: ContentDto,
    userId: string,
  ): Promise<void> {
    const content = await this.contentRepository.findOneById(contentId);
    this.checkAccess(content, userId);

    const newContent = new ContentEntity(type, userId);
    this.contentRepository.update({ id: content.id }, newContent);
  }

  async delete(contentId: number, userId: string): Promise<void> {
    const content = await this.contentRepository.findOneById(contentId);
    this.checkAccess(content, userId);

    await this.contentRepository.delete({ id: contentId });
  }

  checkAccess(content: ContentEntity, userId: string): void {
    const isAllow = content.ownerId === userId;

    if (!isAllow) throw new ForbiddenException(NO_ACCESS_CONTENT);
  }
}
