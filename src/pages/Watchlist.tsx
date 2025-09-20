import React from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import { getId } from '../utils/getId';

export default function Watchlist() {
  const { items, remove, toggleWatched, rate, clear } = useWatchlist();

  if (items.length === 0) {
    return (
      <div style={{ padding: 16 }}>
        <h2>Watchlist</h2>
        <p>Prazno je. Dodaj naslove sa Filmovi/Serije stranica.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h2 style={{ margin: 0 }}>Watchlist</h2>
        <span style={{ opacity: 0.8 }}>({items.length})</span>
        <button
          style={{ marginLeft: 'auto' }}
          onClick={clear}
          title="Ukloni sve iz liste"
        >
          Clear all
        </button>
      </div>

      <ul style={{ display: 'grid', gap: 12, padding: 0, marginTop: 16 }}>
        {items.map((m) => {
          const id = getId(m);
          return (
            <li
              key={id}
              style={{
                listStyle: 'none',
                border: '1px solid #e5e7eb',
                borderRadius: 10,
                padding: 12,
                display: 'grid',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <strong style={{ fontSize: 18 }}>{m.title}</strong>
                <span style={{ opacity: 0.8 }}>{m.year}</span>
              </div>

              <div style={{ opacity: 0.9 }}>
                Watched: <b>{m.watched ? 'Yes' : 'No'}</b> | Rating:{' '}
                <b>{m.rating ?? '-'}</b>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={() => toggleWatched(id)}>
                  {m.watched ? 'Unwatch' : 'Mark watched'}
                </button>
                <button onClick={() => rate(id, (m.rating ?? 0) + 1)}>
                  Rate +
                </button>
                <button
                  onClick={() =>
                    rate(
                      id,
                      (m.rating ?? 0) - 1 <= 0 ? 1 : (m.rating ?? 0) - 1
                    )
                  }
                >
                  Rate –
                </button>
                <button onClick={() => remove(id)}>Remove</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
