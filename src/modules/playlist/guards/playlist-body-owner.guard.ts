import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {
  NO_ACCESS_PLAYLIST,
  PLAYLIST_IS_USED,
  PLAYLIST_NOT_FOUND
} from '../../../common/constants/error.constants';
import { InvalidFieldsException } from '../../../common/exceptions/invalid-fields.exception';
import { ModifyExpressRequest } from '../../../common/types/modify-express-request.type';
import { PlaylistRepository } from '../repositories/playlist.repository';

@Injectable()
export class PlaylistBodyOwnerGuard implements CanActivate {
  constructor(private readonly playlistRepository: PlaylistRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ModifyExpressRequest>();
    const userId = request.user?.sub;

    const { playlistId } = request.body;

    const playlist = await this.playlistRepository.findOne(playlistId);

    if (!playlist)
      throw new InvalidFieldsException({
        playlistId: [PLAYLIST_NOT_FOUND],
      });

    if (playlist.screen)
      throw new InvalidFieldsException({
        playlistId: [PLAYLIST_IS_USED],
      });

    if (playlist.ownerId !== userId)
      throw new InvalidFieldsException({
        playlistId: [NO_ACCESS_PLAYLIST],
      });

    return true;
  }
}
