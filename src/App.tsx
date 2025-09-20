import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Navbar from './components/Navbar'; 
import Watchlist from './pages/Watchlist';
import { WatchlistProvider } from './context/WatchlistContext';
<Route path="/watchlist" element={<Watchlist />} />


function App() {
  return (
    <WatchlistProvider>
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
      </Routes>
    </Router>
    </WatchlistProvider>
  );
}

export default App;
