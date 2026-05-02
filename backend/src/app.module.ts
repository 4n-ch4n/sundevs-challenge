import { Module } from '@nestjs/common';
import { VideosModule } from './videos/videos.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [VideosModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
