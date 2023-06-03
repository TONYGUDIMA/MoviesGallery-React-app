import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ThemovieDB from 'TheMovieDbService';
import { nanoid } from 'nanoid';
function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    if (cast.length > 0) {
    }
    async function get() {
      setCast(await ThemovieDB.getCastById(movieId));
    }
    get();
  }, [cast.length, movieId]);
  if (cast.length === 0) {
    return <h4>No cast found</h4>;
  } else
    return (
      <ul
        style={{
          padding: '20px',
        }}
      >
        {cast.map(member => {
          return (
            <li key={nanoid()}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                alt=""
                width={100}
                height={140}
              />
              <p>{member.name}</p>
              <p>{member.character}</p>
            </li>
          );
        })}
      </ul>
    );
}

export default Cast;
