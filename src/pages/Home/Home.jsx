import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import ThemovieDB from 'TheMovieDbService';
export default function Home() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  useEffect(() => {
    if (results.length > 0) {
      return;
    }
    async function getTrending() {
      setResults(await ThemovieDB.getTrending());
    }

    getTrending();
  });
  return (
    <div>
      <ul
        style={{
          display: 'grid',
          maxWidth: 'calc(100vw - 44px)',
          gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
          gridGap: '44px',
          marginTop: '0',
          marginBottom: '0',
          padding: '32px',
          listStyle: 'none',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {results.map(el => {
          return (
            <Link
              to={`/movies/${el.id}`}
              key={nanoid()}
              state={{ from: location }}
            >
              {' '}
              <li
                style={{
                  width: '500px',
                }}
              >
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                    alt=""
                  />
                  <p> {el.original_title}</p>
                  <p></p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
