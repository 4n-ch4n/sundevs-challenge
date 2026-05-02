import { videosApi } from '@/api/videosApi';
import type { VideosResponse } from '@/interfaces/videos-response.interface';

interface Options {
  limit?: number | string;
  offset?: number | string;
}

export const getVideosAction = async (
  options: Options,
): Promise<VideosResponse> => {
  const { limit, offset } = options;

  const { data } = await videosApi.get<VideosResponse>('/videos', {
    params: {
      limit,
      offset,
    },
  });

  return data;
};
