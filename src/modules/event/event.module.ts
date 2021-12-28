import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService, TypeOrmModule.forFeature([EventRepository])],
})
export class EventModule {}
