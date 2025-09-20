import React, { createContext, useContext, useEffect, useState } from 'react';
import { LocalStorageService } from '../models/LocalStorageService';
import { getId } from '../utils/getId';
import type { Movie } from '../models/Movie';

type AnyId = string | number;
type MovieIdCarrier = { id?: AnyId; _id?: AnyId; movieId?: AnyId };
export type MovieWithMeta = Movie & MovieIdCarrier & {
  watched?: boolean;
  rating?: number;
};

type WatchlistContextValue = {
  items: MovieWithMeta[];
  add: (item: Movie | MovieWithMeta) => void;
  remove: (id: AnyId) => void;
  toggleWatched: (id: AnyId) => void;
  rate: (id: AnyId, r: number) => void;
  clear: () => void;
};

const WatchlistContext = createContext<WatchlistContextValue | undefined>(undefined);
const storage = new LocalStorageService();
const KEY = 'watchlist';

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MovieWithMeta[]>([]);

  useEffect(() => {
    const saved = storage.get<MovieWithMeta[]>(KEY) || [];
    setItems(saved);
  }, []);

  useEffect(() => {
    storage.set(KEY, items);
  }, [items]);

  const add = (item: Movie | MovieWithMeta) =>
    setItems(prev => {
      const idStr = getId(item as MovieWithMeta);
      return prev.some(x => getId(x) === idStr) ? prev : [...prev, { ...(item as MovieWithMeta) }];
    });

  const remove = (id: AnyId) => {
    const idStr = String(id);
    setItems(prev => prev.filter(x => getId(x) !== idStr));
  };

  const toggleWatched = (id: AnyId) => {
    const idStr = String(id);
    setItems(prev =>
      prev.map(x =>
        getId(x) === idStr ? { ...x, watched: !x.watched } : x
      )
    );
  };

  const rate = (id: AnyId, r: number) => {
    const idStr = String(id);
    const safe = Math.min(5, Math.max(1, Math.round(r)));
    setItems(prev =>
      prev.map(x =>
        getId(x) === idStr ? { ...x, rating: safe } : x
      )
    );
  };

  const clear = () => setItems([]);

  return (
    <WatchlistContext.Provider value={{ items, add, remove, toggleWatched, rate, clear }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider');
  return ctx;
}
