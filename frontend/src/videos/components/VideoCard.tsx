import { Clock, Crown, Flame, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  thumbnail: string;
  title: string;
  author: string;
  publishedAt: string;
  hypeLevel: number;
  isCrown?: boolean;
}

export const VideoCard = ({
  thumbnail,
  title,
  author,
  publishedAt,
  hypeLevel,
  isCrown = false,
}: Props) => {
  const hypePercentage = Math.min(hypeLevel * 100, 100);

  return (
    <article
      className={cn(
        isCrown
          ? 'relative col-span-full lg:col-span-2 row-span-2 group'
          : 'group relative bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 hover:border-muted-foreground hover:scale-[1.02]',
      )}
    >
      {isCrown && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-primary px-4 py-1.5 rounded-full">
          <Crown className="w-4 h-4 text-primary-foreground" />
          <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider">
            Joya de la Corona
          </span>
        </div>
      )}

      <div
        className={cn(
          isCrown &&
            'crown-glow relative h-full bg-card rounded-xl border-2 border-primary overflow-hidden transition-all duration-300 hover:scale-[1.02]',
        )}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            onError={(e) => e.currentTarget.src = '/placeholder.svg'}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />

          <div
            className={
              (cn('absolute flex items-center backdrop-blur-sm rounded-full'),
              isCrown
                ? 'top-4 right-4 gap-1.5 bg-accent/90 px-3 py-1.5'
                : 'top-2 right-2 gap-1 bg-secondary/80 px-2 py-1')
            }
          >
            <Flame className="w-3 h-3 text-accent" />
            <span className="text-xs font-semibold text-foreground">
              {(hypeLevel * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className={cn(isCrown ? 'p-6' : 'p-4')}>
          <h3
            className={cn(
              'text-foreground leading-tight line-clamp-2',
              isCrown
                ? 'text-xl lg:text-2xl font-bold mb-3 text-balance'
                : 'text-sm font-semibold mb-2',
            )}
          >
            {title}
          </h3>

          <div
            className={cn(
              'flex text-muted-foreground',
              isCrown ? 'flex-wrap items-center gap-4' : 'flex-col gap-1',
            )}
          >
            <div
              className={cn('flex items-center', isCrown ? 'gap-2' : 'gap-1.5')}
            >
              <User className={cn(isCrown ? 'w-4 h-4' : 'w-3 h-3')} />
              <span
                className={cn(isCrown ? 'text-sm' : 'text-xs text-truncate')}
              >
                {author}
              </span>
            </div>
            <div
              className={cn('flex items-center', isCrown ? 'gap-2' : 'gap-1.5')}
            >
              <Clock className={cn(isCrown ? 'w-4 h-4' : 'w-3 h-3')} />
              <span className={cn(isCrown ? 'text-sm' : 'text-xs')}>
                {publishedAt}
              </span>
            </div>
          </div>

          <div className={cn(isCrown ? 'mt-4' : 'mt-3')}>
            {isCrown && (
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Nivel de Hype</span>
                <span>{(hypeLevel * 100).toFixed(2)}%</span>
              </div>
            )}
            <div
              className={cn(
                'bg-muted rounded-full overflow-hidden',
                isCrown ? 'h-2' : 'h-1',
              )}
            >
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  isCrown
                    ? 'bg-linear-to-r from-orange-500 to-red-500'
                    : 'bg-primary duration-700',
                )}
                style={{ width: `${hypePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
