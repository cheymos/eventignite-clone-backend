import {
  CanActivate,
  ExecutionContext,
  mixin,
  NotFoundException,
  Type
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Repository } from 'typeorm';
import { ModifyExpressRequest } from '../types/modify-express-request.type';

export function OwnerGuard(
  entity: EntityClassOrSchema,
  paramName: string,
): Type<CanActivate> {
  class MixinOwnerGuard implements CanActivate {
    constructor(
      @InjectRepository(entity)
      private readonly repository: Repository<RepositoryType>,
    ) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
      const request = context.switchToHttp().getRequest<ModifyExpressRequest>();

      const resourceId = +request.params[paramName];
      const userId = request.user?.sub;

      if (!userId) return false;

      return this.checkAccess(resourceId, userId);
    }

    async checkAccess(resourceId: number, userId: string): Promise<boolean> {
      const resouce = await this.repository.findOne(resourceId);

      if (!resouce) throw new NotFoundException();

      return resouce?.ownerId === userId;
    }
  }

  return mixin(MixinOwnerGuard);
}

export type RepositoryType = Repository<any> & { ownerId: string };
