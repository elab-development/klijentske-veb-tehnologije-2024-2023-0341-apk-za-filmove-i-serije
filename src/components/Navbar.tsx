import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const linkStyle = {
    padding: '10px 15px',
    textDecoration: 'none',
    color: '#333',
    borderBottom: '2px solid transparent',
    fontSize: '16px',
  };

  const activeStyle = {
    ...linkStyle,
    borderBottom: '2px solid #007bff',
    fontWeight: 'bold',
    color: '#007bff',
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px 30px',
      borderBottom: '1px solid #ddd',
      marginBottom: '20px',
      backgroundColor: '#f8f9fa',
    }}>
    
      <NavLink to="/" style={{
        textDecoration: 'none',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#222',
        fontFamily: 'Georgia, serif',
      }}>
        🎬 FilmTrack
      </NavLink>

    
      <div style={{ display: 'flex', gap: '40px' }}>
        <NavLink to="/" style={({ isActive }) => isActive ? activeStyle : linkStyle}>
          Početna
        </NavLink>
        <NavLink to="/movies" style={({ isActive }) => isActive ? activeStyle : linkStyle}>
          Filmovi
        </NavLink>
        <NavLink to="/series" style={({ isActive }) => isActive ? activeStyle : linkStyle}>
          Serije
        </NavLink>
        <NavLink to="/login" style={({ isActive }) => isActive ? activeStyle : linkStyle}>
          Prijava
          </NavLink>
<NavLink to="/watchlist" style={({ isActive }) => isActive ? activeStyle : linkStyle}>
          Watchlist
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
