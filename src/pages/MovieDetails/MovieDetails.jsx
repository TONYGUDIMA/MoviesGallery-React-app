import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import ThemovieDB from 'TheMovieDbService';

function MovieDetails() {
  const { movieId } = useParams();
  const [info, setinfo] = useState();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/');
  useEffect(() => {
    async function get() {
      setinfo(await ThemovieDB.getMovieById(movieId));
    }
    get();
  }, [movieId]);
  return (
    info && (
      <div style={{ paddingBottom: '500px' }}>
        <Link to={backLink.current}>Go back</Link>
        <div style={{ display: 'flex', gap: '32px', marginBottom: '30px' }}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${info.poster_path}`}
            alt=""
          />
          <div>
            {' '}
            <h2>{info.original_title}</h2>
            <h3>Overview</h3>
            <p>'{info.overview}'</p>
            <h4>Genres</h4>
            <p>
              {info.genres.map(genre => {
                const name = genre.name;
                return <span key={nanoid()}>{name} </span>;
              })}
            </p>
          </div>
        </div>
        <hr />
        <h4 style={{ paddingLeft: '30px' }}>Additional info</h4>
        <ul>
          <li>
            <Link to={`/movies/${info.id}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${info.id}/reviews`}>Reviews</Link>
          </li>
        </ul>
        <hr />
        <Outlet />
      </div>
    )
  );
}

export default MovieDetails;
