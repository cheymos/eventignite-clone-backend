import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export abstract class BaseRepository<Entity> extends Repository<Entity> {
  constructor(private readonly errorMessages: RepositoryErrorMessages) {
    super();
  }

  async findOneById(id: number): Promise<Entity> {
    const entity = await super.findOne(id);
    const { NOT_FOUND_MESSAGE } = this.errorMessages;

    if (!entity) throw new NotFoundException(NOT_FOUND_MESSAGE);

    return entity;
  }
}

interface RepositoryErrorMessages {
  NOT_FOUND_MESSAGE: string;
}
