import { Injectable } from '@nestjs/common';
import { AuthGuard as AG } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends AG('jwt') {}
