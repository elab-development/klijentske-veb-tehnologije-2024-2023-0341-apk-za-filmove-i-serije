#  FilmTrack — Aplikacija za praćenje filmova i serija

Klijentska veb aplikacija (React + TypeScript) za pretragu, filtriranje i organizovanje watchlist-e filmova i serija.

---

##  Pokretanje projekta

Preuslovi: Node.js 18+ i npm

Instalacija i start (dev):
- npm install
- npm run dev

Build za produkciju:
- npm run build
- npm run preview

Aplikacija se pokreće na adresi koju prikaže terminal (http://localhost:3000).

---

## Tehnologije

- React + TypeScript
- react-router-dom (rute, useNavigate, useLocation)
- localStorage (persistencija watchlist-e)
- CSS (inline/običan)

---

##  Struktura projekta

src/
  components/
    Button.tsx
    Input.tsx
    MovieCard.tsx
    Navbar.tsx
    Pagination.tsx
  context/
    AuthContext.tsx
    WatchlistContext.tsx
  models/
    Movie.ts
    IMovieService.ts
    IStorage.ts
    LocalStorageService.ts
  pages/
    Home.tsx
    Login.tsx
    Movies.tsx
    Series.tsx
    Watchlist.tsx
  services/
    MovieService.ts
  utils/
    getId.ts
App.tsx
main.tsx

---

##  Stranice 

- Početna (/) – uvod u aplikaciju
- Prijava (/login) – login (admin/admin), integracija sa AuthContext-om
- Filmovi (/movies) – pretraga, filter po godini, paginacija, Add to Watchlist, URL sinhronizacija (q, y, p)
- Serije (/series) – isto kao Filmovi, za serije
- Watchlist (/watchlist) – pregled sačuvanih; watched toggle, rating (1–5), remove, clear all (dostupno samo prijavljenima)

---

##  Reusable komponente

Button, Input, MovieCard, Navbar, Pagination

---

##  Funkcionalnosti

1) Pretraga po naslovu
2) Filter po godini
3) Paginacija (prva/prethodna/sledeća/poslednja)
4) Dodavanje u watchlist (Movies/Series)
5) Uklanjanje iz watchlist-a
6) Obeležavanje pogledano / nije pogledano
7) Ocena (1–5)
8) Brisanje cele liste (clear all)
9) Prijava/odjava (AuthContext) i zaštita Watchlist stranice

---

## Hook-ovi

useState, useEffect, useMemo, useContext, useLocation, useNavigate

---

## Modeli / Interfejsi / Klase / Konteksti

- Interfejsi: IMovieService, IStorage
- Klase: Movie, LocalStorageService
- Konteksti: WatchlistContext (persistencija preko LocalStorageService), AuthContext (login/logout)

---

##  Čuvanje podataka

- localStorage (ključ: watchlist) — automatsko učitavanje i čuvanje stavki.


