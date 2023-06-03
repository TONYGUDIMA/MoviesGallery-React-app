import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import ThemovieDB from 'TheMovieDbService';
function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (reviews.length > 0) {
      return;
    }
    async function get() {
      setReviews(await ThemovieDB.getReviewsById(movieId));
    }
    get();
  }, [movieId, reviews.length]);
  if (reviews.length === 0) {
    return <h4>No reviews found</h4>;
  } else
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
