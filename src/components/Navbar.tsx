import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const linkStyle: React.CSSProperties = {
    padding: '10px 15px',
    textDecoration: 'none',
    color: '#333',
    borderBottom: '2px solid transparent',
    fontSize: '16px',
  };

  const activeStyle: React.CSSProperties = {
    ...linkStyle,
    borderBottom: '2px solid #007bff',
    fontWeight: 'bold',
    color: '#007bff',
  };

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 30px',
        borderBottom: '1px solid #ddd',
        marginBottom: '20px',
        backgroundColor: '#f8f9fa',
      }}
    >
      <NavLink
        to="/"
        style={{
          textDecoration: 'none',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#222',
          fontFamily: 'Georgia, serif',
        }}
      >
        🎬 FilmTrack
      </NavLink>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
          Početna
        </NavLink>
        <NavLink to="/movies" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
          Filmovi
        </NavLink>
        <NavLink to="/series" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
          Serije
        </NavLink>
        <NavLink to="/watchlist" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
          Watchlist
        </NavLink>

        {user ? (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginLeft: 8 }}>
            <span style={{ opacity: 0.9 }}>👤 {user}</span>
            <button
              onClick={logout}
              style={{
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: 6,
                background: '#fff',
                cursor: 'pointer',
              }}
            >
              Odjava
            </button>
          </div>
        ) : (
          <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
            Prijava
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
