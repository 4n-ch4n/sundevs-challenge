import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from './videos.service';
import { VideosRepository } from './videos.repository';

describe('videos.service.ts', () => {
  let service: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideosService, VideosRepository],
    }).compile();

    service = module.get<VideosService>(VideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all videos with pagination', async () => {
    const videosResponse = await service.findAll({ limit: 5, offset: 0 });

    expect(typeof videosResponse.count).toBe('number');
    expect(typeof videosResponse.pages).toBe('number');
    expect(videosResponse.videos).toBeInstanceOf(Array);
    expect(videosResponse.videos.length).toBe(5);
  });

  it('should find all videos with default pagination', async () => {
    const videosResponse = await service.findAll({});

    expect(typeof videosResponse.count).toBe('number');
    expect(typeof videosResponse.pages).toBe('number');
    expect(videosResponse.videos).toBeInstanceOf(Array);
    expect(videosResponse.videos.length).toBe(9);
  });
});
