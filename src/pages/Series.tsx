import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

const Series = () => {
  const allSeries = [
    { title: 'Breaking Bad', year: 2008, rating: 9.5, posterUrl: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
    { title: 'Stranger Things', year: 2016, rating: 8.7, posterUrl: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg' },
    { title: 'Game of Thrones', year: 2011, rating: 9.3, posterUrl: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg' },
    { title: 'The Office', year: 2005, rating: 8.9, posterUrl: 'https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg' },
    { title: 'Chernobyl', year: 2019, rating: 9.4, posterUrl: 'https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const filtered = allSeries.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Serije</h2>

      <input
        type="text"
        placeholder="Pretraži serije..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
          paged.map((series, index) => (
            <MovieCard
              key={index}
              title={series.title}
              year={series.year}
              rating={series.rating}
              posterUrl={series.posterUrl}
            />
          ))
        ) : (
          <p>Nema serija koje odgovaraju pretrazi.</p>
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

