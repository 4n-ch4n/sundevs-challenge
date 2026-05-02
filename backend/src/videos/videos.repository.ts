import { Injectable, InternalServerErrorException } from '@nestjs/common';
import path from 'path';
import fs from 'fs/promises';
import { RawVideo } from './interfaces';

@Injectable()
export class VideosRepository {
  private readonly dataPath = path.join(
    __dirname,
    '../../data/mock-youtube-api.json',
  );

  async getRawVideos(): Promise<RawVideo[]> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      const parsedData = JSON.parse(data) as { items: RawVideo[] };
      return parsedData.items;
    } catch {
      throw new InternalServerErrorException('Failed to read video data');
    }
  }
}
