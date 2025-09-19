import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { Movie } from '../models/Movie';
import { MovieService } from '../services/MovieService';

const movieService = new MovieService();

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

useEffect(() => {
  const allMovies = movieService.getAll();
  setMovies(allMovies);
}, []);



  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = movieService.search(value);
    setMovies(filtered);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Filmovi</h2>

      <input
        type="text"
        placeholder="Pretraži filmove..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
              posterUrl={movie.posterUrl}
            />
          ))
        ) : (
          <p>Nema filmova koji odgovaraju pretrazi.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
