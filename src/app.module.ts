import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './configs/orm.config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(getOrmConfig())],
})
export class AppModule {}
