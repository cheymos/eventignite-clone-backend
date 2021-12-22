import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './configs/orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { ContentPropertyModule } from './modules/content-property/content-property.module';
import { ContentVariantModule } from './modules/content-variant/content-variant.module';
import { ContentModule } from './modules/content/content.module';
import { EventModule } from './modules/event/event.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { ScreenModule } from './modules/screen/screen.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(getOrmConfig()),
    AuthModule,
    EventModule,
    ScreenModule,
    PlaylistModule,
    ContentModule,
    ContentVariantModule,
    ContentPropertyModule,
  ],
})
export class AppModule {}
