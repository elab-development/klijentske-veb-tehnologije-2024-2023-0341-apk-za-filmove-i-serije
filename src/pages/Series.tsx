import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { useWatchlist } from '../context/WatchlistContext';
import { getId } from '../utils/getId';

type SortOption = '' | 'az' | 'za' | 'yearAsc' | 'yearDesc' | 'ratingAsc' | 'ratingDesc';

const safeId = (m: any) => String(m.id ?? m._id ?? m.movieId ?? `${m.title}-${m.year}`);

const Series = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const allSeries = [
    { title: 'Breaking Bad', year: 2008, rating: 9.5, posterUrl: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', genres: ['Crime', 'Drama'] },
    { title: 'Stranger Things', year: 2016, rating: 8.7, posterUrl: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', genres: ['Sci-Fi', 'Horror'] },
    { title: 'Game of Thrones', year: 2011, rating: 9.3, posterUrl: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg', genres: ['Fantasy', 'Drama'] },
    { title: 'The Office', year: 2005, rating: 8.9, posterUrl: 'https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg', genres: ['Comedy'] },
    { title: 'Chernobyl', year: 2019, rating: 9.4, posterUrl: 'https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg', genres: ['Drama', 'History'] },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [sort, setSort] = useState<SortOption>('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const { items, add } = useWatchlist();
  const idsInWatchlist = useMemo(() => new Set(items.map(getId)), [items]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') ?? '';
    const y = params.get('y') ?? '';
    const g = params.get('g') ?? '';
    const s = (params.get('s') ?? '') as SortOption;
    const p = parseInt(params.get('p') ?? '1', 10);
    setSearchTerm(q);
    setYear(y);
    setGenre(g);
    setSort(s);
    setPage(Number.isFinite(p) && p > 0 ? p : 1);
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('q', searchTerm.trim());
    if (year.trim()) params.set('y', year.trim());
    if (genre.trim()) params.set('g', genre.trim());
    if (sort) params.set('s', sort);
    if (page > 1) params.set('p', String(page));
    const qs = params.toString();
    const next = qs ? `?${qs}` : '';
    if (location.search !== next) {
      navigate({ pathname: '/series', search: next }, { replace: true });
    }
  }, [searchTerm, year, genre, sort, page, navigate, location.search]);

  const genres = useMemo((): string[] => {
    const set = new Set<string>();
    allSeries.forEach((s) => {
      const arr: string[] =
        (s as any).genres ??
        ((s as any).genre ? [(s as any).genre as string] : ['Ostalo']);
      arr.forEach((g: string) => set.add(g));
    });
    return Array.from(set);
  }, [allSeries]);

  const filtered = useMemo(() => {
    const y = year.trim();
    const g = genre.trim();
    return allSeries.filter((s) => {
      const okText = s.title.toLowerCase().includes(searchTerm.toLowerCase());
      const okYear = y === '' ? true : String(s.year) === y;
      const arr: string[] =
        (s as any).genres ??
        ((s as any).genre ? [(s as any).genre as string] : ['Ostalo']);
      const okGenre = g === '' ? true : arr.includes(g);
      return okText && okYear && okGenre;
    });
  }, [allSeries, searchTerm, year, genre]);

  const sorted = useMemo(() => {
    const a = [...filtered];
    switch (sort) {
      case 'az':
        a.sort((x, y) => x.title.localeCompare(y.title));
        break;
      case 'za':
        a.sort((x, y) => y.title.localeCompare(x.title));
        break;
      case 'yearAsc':
        a.sort((x, y) => x.year - y.year);
        break;
      case 'yearDesc':
        a.sort((x, y) => y.year - x.year);
        break;
      case 'ratingAsc':
        a.sort((x, y) => (x.rating ?? 0) - (y.rating ?? 0));
        break;
      case 'ratingDesc':
        a.sort((x, y) => (y.rating ?? 0) - (x.rating ?? 0));
        break;
      default:
        break;
    }
    return a;
  }, [filtered, sort]);

  const total = sorted.length;
  const start = (page - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, year, genre, sort]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Serije</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Pretraži serije..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '220px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Godina"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: '10px', width: '120px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{ padding: '10px', minWidth: 160, borderRadius: 5, border: '1px solid #ccc' }}
        >
          <option value="" disabled>
            Izaberi žanr
          </option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          style={{ padding: '10px', minWidth: 200, borderRadius: 5, border: '1px solid #ccc' }}
        >
          <option value="">Sortiraj</option>
          <option value="az">Naslov: A → Z</option>
          <option value="za">Naslov: Z → A</option>
          <option value="yearAsc">Godina: najstarije prvo</option>
          <option value="yearDesc">Godina: najnovije prvo</option>
          <option value="ratingDesc">Ocena: najviša prvo</option>
          <option value="ratingAsc">Ocena: najniža prvo</option>
        </select>
      </div>

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {paged.length > 0 ? (
          paged.map((series) => {
            const id = safeId(series);
            const inWL = idsInWatchlist.has(id);
            return (
              <div key={id} style={{ display: 'grid', gap: 8 }}>
                <MovieCard title={series.title} year={series.year} rating={series.rating} posterUrl={series.posterUrl} />
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
        <Pagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default Series;
