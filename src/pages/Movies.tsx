import React, { useEffect, useState, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { useWatchlist } from '../context/WatchlistContext';
import { getId } from '../utils/getId';
import { Movie } from '../models/Movie';
import { MovieService } from '../services/MovieService';

const movieService = new MovieService();

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const { items, add } = useWatchlist();
  const idsInWatchlist = useMemo(() => new Set(items.map(getId)), [items]);

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
          border: '1px solid ' + '#ccc'
        }}
      />

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {paged.length > 0 ? (
          paged.map((movie) => {
            const id = getId(movie as any);
            const inWL = idsInWatchlist.has(id);
            return (
              <div key={id} style={{ display: 'grid', gap: 8 }}>
                <MovieCard
                  title={movie.title}
                  year={movie.year}
                  rating={movie.rating}
                  posterUrl={movie.posterUrl}
                />
                <button
                  onClick={() => add({ ...movie, movieId: id })}
                  disabled={inWL}
                  style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid ' + '#ccc' }}
                >
                  {inWL ? 'U watchlist-i' : 'Dodaj u watchlist'}
                </button>
              </div>
            );
          })
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
