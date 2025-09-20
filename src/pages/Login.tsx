import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

  
    if (email === 'admin' && password === 'admin') {
      alert('Uspešno prijavljivanje!');
      navigate('/');
    } else {
      alert('Pogrešni podaci');
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>FilmTrack</h2>

      <form onSubmit={handleLogin}>
        <Input
          label="Email ili korisničko ime:"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Lozinka:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" label="Prijavi se" />
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Nemate nalog? <a href="#">Registrujte se</a>
      </p>
    </div>
  );
};

export default Login;
