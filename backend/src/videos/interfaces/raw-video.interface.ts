export interface RawVideo {
  id: string;
  snippet: Snippet;
  statistics: Statistics;
}

export interface Snippet {
  title: string;
  channelTitle: string;
  publishedAt: Date;
  thumbnails: Thumbnails;
}

export interface Thumbnails {
  high: High;
}

export interface High {
  url: string;
}

export interface Statistics {
  viewCount: string;
  likeCount: string;
  commentCount?: string;
}
