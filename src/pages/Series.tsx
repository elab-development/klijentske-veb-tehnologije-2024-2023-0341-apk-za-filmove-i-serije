import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { useWatchlist } from '../context/WatchlistContext';
import { getId } from '../utils/getId';

const safeId = (m: any) => String(m.id ?? m._id ?? m.movieId ?? `${m.title}-${m.year}`);

const Series = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const allSeries = [
    { title: 'Breaking Bad', year: 2008, rating: 9.5, posterUrl: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
    { title: 'Stranger Things', year: 2016, rating: 8.7, posterUrl: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg' },
    { title: 'Game of Thrones', year: 2011, rating: 9.3, posterUrl: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg' },
    { title: 'The Office', year: 2005, rating: 8.9, posterUrl: 'https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg' },
    { title: 'Chernobyl', year: 2019, rating: 9.4, posterUrl: 'https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState<string>('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const { items, add } = useWatchlist();
  const idsInWatchlist = useMemo(() => new Set(items.map(getId)), [items]);

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
    if (location.search !== next) {
      navigate({ pathname: '/series', search: next }, { replace: true });
    }
  }, [searchTerm, year, page, navigate, location.search]);

  const filtered = useMemo(() => {
    const y = year.trim();
    return allSeries.filter(s => {
      const okText = s.title.toLowerCase().includes(searchTerm.toLowerCase());
      const okYear = y === '' ? true : String(s.year) === y;
      return okText && okYear;
    });
  }, [allSeries, searchTerm, year]);

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, year]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Serije</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Pretraži serije..."
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
          paged.map((series) => {
            const id = safeId(series);
            const inWL = idsInWatchlist.has(id);
            return (
              <div key={id} style={{ display: 'grid', gap: 8 }}>
                <MovieCard
                  title={series.title}
                  year={series.year}
                  rating={series.rating}
                  posterUrl={series.posterUrl}
                />
                <button
                  onClick={() => add({ ...series, movieId: id })}
                  disabled={inWL}
                  style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' }}
                >
                  {inWL ? 'U watchlist-i' : 'Dodaj u watchlist'}
                </button>
              </div>
            );
          })
        ) : (
          <p>Nema serija koje odgovaraju filterima.</p>
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

export default Series;
