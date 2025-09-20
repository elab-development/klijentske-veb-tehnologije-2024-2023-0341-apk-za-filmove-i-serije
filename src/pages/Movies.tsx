import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { Movie } from '../models/Movie';
import { MovieService } from '../services/MovieService';

const movieService = new MovieService();

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const allMovies = movieService.getAll();
    setMovies(allMovies);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = value ? movieService.search(value) : movieService.getAll();
    setMovies(filtered);
  };

  const total = movies.length;
  const start = (page - 1) * pageSize;
  const paged = movies.slice(start, start + pageSize);

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

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {paged.length > 0 ? (
          paged.map((movie, index) => (
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

      <div style={{ marginTop: '16px' }}>
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Movies;
