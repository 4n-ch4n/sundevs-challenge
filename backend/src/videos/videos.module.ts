import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { VideosRepository } from './videos.repository';

@Module({
  controllers: [VideosController],
  providers: [VideosService, VideosRepository],
})
export class VideosModule {}
