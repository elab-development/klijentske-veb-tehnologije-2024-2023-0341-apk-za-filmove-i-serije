import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Navbar from './components/Navbar'; 
import Watchlist from './pages/Watchlist';
import { WatchlistProvider } from './context/WatchlistContext';
import { AuthProvider } from './context/AuthContext';
<Route path="/watchlist" element={<Watchlist />} />

function App() {
  return (

  <Router>
    <WatchlistProvider>
      <AuthProvider>
    
      <Navbar /> 
      <Routes>
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
      </Routes>
      </AuthProvider>
    </WatchlistProvider>
    </Router>
    
  );
}

export default App;
