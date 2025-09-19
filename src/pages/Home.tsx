import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: 'center',
      padding: '40px',
    }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>🎬 FilmTrack</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Aplikacija za praćenje filmova i serija. Prijavi se, pregledaj i dodaj omiljene naslove!
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
  <button className="btn btn-primary" onClick={() => navigate('/login')}>Prijavi se</button>
  <button className="btn btn-secondary" onClick={() => navigate('/register')}>Registruj se</button>
  <button className="btn btn-outline-success" onClick={() => navigate('/movies')}>Filmovi</button>
  <button className="btn btn-outline-info" onClick={() => navigate('/series')}>Serije</button>
</div>

      </div>
    </div>
  );
};

export default Home;
