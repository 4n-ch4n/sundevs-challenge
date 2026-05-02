import { Test } from '@nestjs/testing';
import { VideosController } from './videos.controller';
import { VideosRepository } from './videos.repository';
import { VideosService } from './videos.service';
import { PaginationDto } from '../common/dtos/pagination.dto';

const mockVideosResponse = {
  count: 1,
  pages: 1,
  videos: [
    {
      thumbnail:
        'https://via.placeholder.com/300x200/282c34/61dafb?text=TailwindCSS',
      title: 'TailwindCSS errores comunes - Tutorial',
      author: 'JuniorDev99',
      relativeDate: 'hace 2 años',
      hypeLevel: 0.30797788004176496,
    },
  ],
};

describe('videos.controller.ts', () => {
  let controller: VideosController;
  let service: VideosService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [VideosService, VideosRepository],
    }).compile();

    controller = moduleRef.get<VideosController>(VideosController);
    service = moduleRef.get<VideosService>(VideosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have called the service with correct parameter', async () => {
    const dto: PaginationDto = { limit: 5, offset: 5 };

    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(mockVideosResponse));

    const videosResponse = await controller.findAll(dto);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.findAll).toHaveBeenCalledWith(dto);
    expect(videosResponse).toEqual(mockVideosResponse);
  });
});
