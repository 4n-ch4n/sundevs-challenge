import { Injectable } from '@nestjs/common';
import { VideosRepository } from './videos.repository';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Video } from './entities';
import { DateFormatter } from '../common/utils/date-formatter.util';

@Injectable()
export class VideosService {
  constructor(private readonly videosRepository: VideosRepository) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 9, offset = 0 } = paginationDto;

    const rawVideos = await this.videosRepository.getRawVideos();
    const videos: Video[] = rawVideos.map((rawVideo) => {
      let hypeLevel = 0;

      if (rawVideo.statistics.commentCount) {
        hypeLevel +=
          (Number(rawVideo.statistics.likeCount) +
            Number(rawVideo.statistics.commentCount)) /
            Number(rawVideo.statistics.viewCount) || 1;
      }

      if (rawVideo.snippet.title.toLowerCase().includes('tutorial')) {
        hypeLevel *= 2;
      }

      return {
        thumbnail: rawVideo.snippet.thumbnails.high.url,
        title: rawVideo.snippet.title,
        author: rawVideo.snippet.channelTitle,
        relativeDate: DateFormatter.getRelativeTime(
          new Date(rawVideo.snippet.publishedAt),
        ),
        hypeLevel: hypeLevel,
      };
    });

    const sortedVideos = videos.sort((a, b) => b.hypeLevel - a.hypeLevel);
    const paginatedVideos = sortedVideos.slice(offset, offset + limit);

    return {
      count: sortedVideos.length,
      pages: Math.ceil(sortedVideos.length / limit),
      videos: paginatedVideos,
    };
  }
}
