import { Shown } from './shown';

export interface Movie {
  title: string;
  image_url?: string;
  release_year?: number;
  synopsis?: string;

  shown?: Shown;
}
