import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { useWatchlist } from '../context/WatchlistContext';
import { getId } from '../utils/getId';
import { Movie } from '../models/Movie';
import { MovieService } from '../services/MovieService';

const movieService = new MovieService();
const safeId = (m: any) => String(m.id ?? m._id ?? m.movieId ?? `${m.title}-${m.year}`);

const Movies = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState<string>('');
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const { items, add } = useWatchlist();
  const idsInWatchlist = useMemo(() => new Set(items.map(getId)), [items]);

  useEffect(() => {
    const list = movieService.getAll();
    setAllMovies(list);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') ?? '';
    const y = params.get('y') ?? '';
    const p = parseInt(params.get('p') ?? '1', 10);
    setSearchTerm(q);
    setYear(y);
    setPage(Number.isFinite(p) && p > 0 ? p : 1);
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('q', searchTerm.trim());
    if (year.trim()) params.set('y', year.trim());
    if (page > 1) params.set('p', String(page));
    const qs = params.toString();
    const next = qs ? `?${qs}` : '';
    const current = location.search;
    if (current !== next) {
      navigate({ pathname: '/movies', search: next }, { replace: true });
    }
  }, [searchTerm, year, page, navigate, location.search]);

  const filtered = useMemo(() => {
    const y = year.trim();
    return allMovies.filter(m => {
      const okText = m.title.toLowerCase().includes(searchTerm.toLowerCase());
      const okYear = y === '' ? true : String(m.year) === y;
      return okText && okYear;
    });
  }, [allMovies, searchTerm, year]);

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, year, allMovies]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Filmovi</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Pretraži filmove..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '260px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Godina"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: '10px', width: '120px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {paged.length > 0 ? (
          paged.map((movie) => {
            const id = safeId(movie);
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
                  style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' }}
                >
                  {inWL ? 'U watchlist-i' : 'Dodaj u watchlist'}
                </button>
              </div>
            );
          })
        ) : (
          <p>Nema filmova koji odgovaraju filterima.</p>
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
