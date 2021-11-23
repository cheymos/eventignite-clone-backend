import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
