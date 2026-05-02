import { VideoGrid } from '@/videos/components/VideoGrid';
import { CustomJumbotron } from '@/videos/components/CustomJumbotron';
import { CustomPagination } from '@/videos/components/CustomPagination';
import { useVideos } from '@/videos/hooks/useVideos';
import { CustomLoader } from '@/components/custom/CustomLoader';
import { ErrorState } from '@/components/custom/ErrorState';

export const FeedPage = () => {
  const { data, isLoading, isError } = useVideos();

  return (
    <main className="container mx-auto px-4 py-8">
      <CustomJumbotron
        title="Videos destacados"
        subtitle="Los videos de mayor nivel de hype de tu cartelera de conocimiento"
      />

      {isLoading && <CustomLoader />}
      {isError && <ErrorState />}
      <VideoGrid videos={data?.videos || []} />

      <CustomPagination
        totalPages={data?.pages || 0}
        totalVideos={data?.count || 0}
      />
    </main>
  );
};
