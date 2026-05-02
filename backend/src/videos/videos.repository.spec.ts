import { Test } from '@nestjs/testing';
import { VideosRepository } from './videos.repository';

describe('videos.repository.ts', () => {
  let repository: VideosRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [VideosRepository],
    }).compile();

    repository = moduleRef.get<VideosRepository>(VideosRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should return an array of raw videos', async () => {
    const rawVideos = await repository.getRawVideos();

    expect(Array.isArray(rawVideos)).toBe(true);
    expect(rawVideos.length).toBeGreaterThan(0);
    expect(rawVideos[0]).toHaveProperty('id');
    expect(rawVideos[0]).toHaveProperty('snippet');
  });
});
