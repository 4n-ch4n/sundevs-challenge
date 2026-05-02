import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { VideosModule } from './videos/videos.module';
import { CommonModule } from './common/common.module';

describe('app.module.ts', () => {
  let videosModule: VideosModule;
  let commonModule: CommonModule;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    videosModule = moduleRef.get<VideosModule>(VideosModule);
    commonModule = moduleRef.get<CommonModule>(CommonModule);
  });

  it('should be defined with proper elements', () => {
    expect(videosModule).toBeDefined();
    expect(commonModule).toBeDefined();
  });
});
