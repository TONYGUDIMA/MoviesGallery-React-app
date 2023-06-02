import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';
function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    if (cast.length > 0) {
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
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          options
        );
        setCast(response.data.cast);
      } catch (error) {
        console.log(error);
      }
    }
    get();
  });
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
