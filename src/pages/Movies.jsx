import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';

export default function Movies() {
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams('');
  const location = useLocation();
  useEffect(() => {
    const value = searchParams.get('name') ?? '';
    if (inputValue === value) {
      return;
    }
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
          `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`,
          options
        );
        setSearchResult(response.data.results);
        setInputValue(value);
      } catch (error) {
        console.log(error);
      }
    }
    get();
  });
  const onSubmit = async () => {
    if (!inputValue) {
      return;
    }
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
        `https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false&language=en-US&page=1`,
        options
      );
      setSearchResult(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = e => {
    setInputValue(e.target.value);
    setSearchParams({ name: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search for movies"
          onChange={handleChange}
        />
      </form>
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
        {searchResult.map(el => {
          return (
            <Link to={`${el.id}`} key={nanoid()} state={{ from: location }}>
              <li
                key={el.id}
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
    </>
  );
}
