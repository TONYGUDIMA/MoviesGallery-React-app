import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';
function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
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
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
          options
        );
        setReviews(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    get();
  });
  return (
    <ul
      style={{
        padding: '20px',
      }}
    >
      {reviews.map(review => {
        return (
          <li key={nanoid()}>
            <h4>Author: {review.author}</h4>
            <p>{review.content}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default Reviews;
