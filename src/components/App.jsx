import React, { Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import css from './App.module.css';
import { ColorRing } from 'react-loader-spinner';
const Home = React.lazy(() => import('pages/Home'));
const Movies = React.lazy(() => import('pages/Movies'));
const MovieDetails = React.lazy(() => import('./MovieDetails'));
const Cast = React.lazy(() => import('./Cast'));
const Reviews = React.lazy(() => import('./Reviews'));

export default function App() {
  return (
    <div className={css}>
      <header
        style={{
          padding: '20px',
        }}
      >
        <nav
          style={{
            display: 'flex',
            gap: '20px',
          }}
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
        </nav>
      </header>
      <Suspense fallback={<ColorRing />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}
