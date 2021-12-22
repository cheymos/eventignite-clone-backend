import {
    ForbiddenException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    CONTENT_NOT_FOUND,
    NO_ACCESS_CONTENT
} from '../../common/constants/error.constants';
import { ContentDto } from './dtos/content.dto';
import { ContentEntity } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
  ) {}

  async create({ type }: ContentDto, userId: string): Promise<number> {
    const newContent = new ContentEntity(type, userId);
    const { id } = await this.contentRepository.save(newContent);

    return id;
  }

  async getOne(contentId: number, userId: string): Promise<ContentEntity> {
    const content = await this.findOne(contentId);
    this.checkAccess(content, userId);

    return content;
  }

  async update(
    contentId: number,
    { type }: ContentDto,
    userId: string,
  ): Promise<void> {
    const content = await this.findOne(contentId);
    this.checkAccess(content, userId);

    const newContent = new ContentEntity(type, userId);
    this.contentRepository.update({ id: content.id }, newContent);
  }

  async delete(contentId: number, userId: string): Promise<void> {
    const content = await this.findOne(contentId);
    this.checkAccess(content, userId);

    await this.contentRepository.delete({ id: contentId });
  }

  checkAccess(content: ContentEntity, userId: string): void {
    const isAllow = content.ownerId === userId;

    if (!isAllow) throw new ForbiddenException(NO_ACCESS_CONTENT);
  }

  async findOne(contentId: number): Promise<ContentEntity> {
    const content = await this.contentRepository.findOne(contentId);

    if (!content) throw new NotFoundException(CONTENT_NOT_FOUND);

    return content;
  }
}
