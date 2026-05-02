import type { Video } from './video.interface';

export interface VideosResponse {
    count:  number;
    pages:  number;
    videos: Video[];
}
