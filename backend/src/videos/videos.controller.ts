import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Video } from './entities';
import { VideosService } from './videos.service';
import { PaginationDto } from '../common/dtos/pagination.dto';

@ApiTags('Videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de videos obtenida exitosamente.',
    type: [Video],
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.videosService.findAll(paginationDto);
  }
}
