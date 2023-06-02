import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
export default function Home() {
  const [results, setResults] = useState([]);
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
          'https://api.themoviedb.org/3/trending/all/day?language=en-US',
          options
        );
        const results = response.data.results;
        setResults(results);
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, []);
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
            <Link to={`/movies/${el.id}`} key={nanoid()}>
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
