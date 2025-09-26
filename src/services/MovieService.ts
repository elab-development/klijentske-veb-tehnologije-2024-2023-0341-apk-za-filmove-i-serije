import { IMovieService } from '../models/IMovieService';
import { Movie } from '../models/Movie';

export class MovieService implements IMovieService {
  private movies: Movie[] = [
    {
      title: 'Inception',
      year: 2010,
      rating: 8.8,
      posterUrl: '/images/inception.jpg',
      genre: 'Sci-Fi'
    },
    {
      title: 'Interstellar',
      year: 2014,
      rating: 8.6,
      posterUrl: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
      genre: 'Sci-Fi'
    },
    {
      title: 'The Dark Knight',
      year: 2008,
      rating: 9.0,
      posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      genre: 'Sci-Fi'
    },
    {
      title: 'The Usual Suspects',
      year: 1995,
      rating: 8.5,
      posterUrl: 'https://image.tmdb.org/t/p/w500/bUPmtQzrRhzqYySeiMpv7GurAfm.jpg',
      genres: ['Action', 'Mystery']
    },
    {
      title: 'The Godfather',
      year: 1972,
      rating: 9.2,
      posterUrl: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      genre: 'Crime'
    },
    {
      title: 'Fight Club',
      year: 1999,
      rating: 8.8,
      posterUrl: 'https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg',
      genres: ['Action', 'Mystery']
    },
  ];

  getAll(): Movie[] {
    return this.movies;
  }

  search(title: string): Movie[] {
    return this.movies.filter(movie =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
  }
}
