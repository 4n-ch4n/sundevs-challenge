import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getVideosAction } from '../actions/get-videos.action';

export const useVideos = () => {
  const [searchParams] = useSearchParams();

  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;

  const offset = (+page - 1) * +limit;

  return useQuery({
    queryKey: ['videos', { offset, limit }],
    queryFn: () =>
      getVideosAction({
        offset: isNaN(+offset) ? 0 : +offset,
        limit: isNaN(+limit) ? 9 : +limit,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
