import { NotFoundException } from '@nestjs/common';
import { FindConditions, FindOneOptions, ObjectID, Repository } from 'typeorm';

export abstract class BaseRepository<Entity> extends Repository<Entity> {
  constructor(private readonly errorMessages: RepositoryErrorMessages) {
    super();
  }

  findOneOrException(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity>;
  findOneOrException(options?: FindOneOptions<Entity>): Promise<Entity>;
  findOneOrException(
    conditions?: FindConditions<Entity>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity>;
  async findOneOrException(conditions?: any, options?: any): Promise<Entity> {
    const entity = await super.findOne(conditions, options);
    const { NOT_FOUND_MESSAGE } = this.errorMessages;

    if (!entity) throw new NotFoundException(NOT_FOUND_MESSAGE);

    return entity;
  }
}

interface RepositoryErrorMessages {
  NOT_FOUND_MESSAGE: string;
}
