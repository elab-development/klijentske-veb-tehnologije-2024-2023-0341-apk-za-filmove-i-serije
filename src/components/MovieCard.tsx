import React from 'react';

type MovieCardProps = {
  title: string;
  year: number;
  rating: number;
  posterUrl: string;
};

const MovieCard: React.FC<MovieCardProps> = ({ title, year, rating, posterUrl }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      overflow: 'hidden',
      width: '200px',
      margin: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <img src={posterUrl} alt={title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      <div style={{ padding: '10px' }}>
        <h3 style={{ margin: '0 0 5px' }}>{title}</h3>
        <p style={{ margin: '0 0 5px' }}>Godina: {year}</p>
        <p style={{ margin: 0 }}>Ocena: ⭐ {rating}</p>
      </div>
    </div>
  );
};

export default MovieCard;
