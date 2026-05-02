import type { Video } from '@/interfaces/video.interface';
import { useSearchParams } from 'react-router';
import { VideoCard } from './VideoCard';

interface Props {
  videos: Video[];
}

export const VideoGrid = ({ videos }: Props) => {
  const [searchParams] = useSearchParams();

  const queryPage = searchParams.get('page') ?? '1';
  const page = isNaN(+queryPage) ? 1 : +queryPage;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <VideoCard
            thumbnail={video.thumbnail}
            title={video.title}
            author={video.author}
            publishedAt={video.relativeDate}
            hypeLevel={video.hypeLevel}
            isCrown={page === 1 && index === 0}
          />
        ))}
      </div>
    </div>
  );
};
