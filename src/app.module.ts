import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './configs/orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule } from './modules/event/event.module';
import { UserModule } from './modules/user/user.module';
import { ScreenModule } from './modules/screen/screen.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { ContentModule } from './modules/content/content.module';
import { ContentVariantModule } from './modules/content-variant/content-variant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(getOrmConfig()),
    UserModule,
    AuthModule,
    EventModule,
    ScreenModule,
    PlaylistModule,
    ContentModule,
    ContentVariantModule,
  ],
})
export class AppModule {}
