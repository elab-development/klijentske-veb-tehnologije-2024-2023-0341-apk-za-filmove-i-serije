import { Movie } from './Movie';

export interface IMovieService {
  getAll(): Movie[];
  search(title: string): Movie[];
}
