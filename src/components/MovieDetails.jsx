import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import axios from 'axios';

function MovieDetails() {
  const { movieId } = useParams();
  const [info, setinfo] = useState();
  const location = useLocation();
  useEffect(() => {
    async function get() {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTFlM2NhNWEwMzhjYjE5YWE0NDQ4MTcyMjJjNDViMyIsInN1YiI6IjY0Nzc3ZDQ5MTc0OTczMDEzNWZmOWMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wAdw2a-XnOHB5EkPOkcAHNROr6KXTn-LqbFP8KDzpdE',
          },
        };

        const response = await axios(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );
        setinfo(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, [movieId]);
  return (
    info && (
      <div style={{ paddingBottom: '500px' }}>
        <Link to={location.state.from}>Go back</Link>
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
