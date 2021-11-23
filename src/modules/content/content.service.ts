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

  async create({ type, body }: ContentDto, userId: number): Promise<number> {
    const newContent = new ContentEntity(type, body, userId);
    const { id } = await this.contentRepository.save(newContent);

    return id;
  }

  async getOne(contentId: number, userId: number): Promise<ContentEntity> {
    const content = await this.findOne(contentId);
    this.checkAccess(content, userId);

    return content;
  }

  async update(
    contentId: number,
    { type, body }: ContentDto,
    userId: number,
  ): Promise<void> {
    const content = await this.findOne(contentId);
    this.checkAccess(content, userId);

    const newContent = new ContentEntity(type, body, userId);
    this.contentRepository.update({ id: content.id }, newContent);
  }

  async delete(contentId: number, userId: number): Promise<void> {
    const content = await this.findOne(contentId);
    this.checkAccess(content, userId);

    await this.contentRepository.delete({ id: contentId });
  }

  checkAccess(content: ContentEntity, userId: number): void {
    const isAllow = content.ownerId === userId;

    if (!isAllow) throw new ForbiddenException(NO_ACCESS_CONTENT);
  }

  async findOne(playlistId: number): Promise<ContentEntity> {
    const content = await this.contentRepository.findOne(playlistId);

    if (!content) throw new NotFoundException(CONTENT_NOT_FOUND);

    return content;
  }
}
