import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ReviewDetails() {
  const { reviewId } = useParams(); // Retrieve the reviewId from URL params
  const [movie, setMovie] = useState({});
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewAndMovie = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // Fetch review data from the backend
        const reviewResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/reviews/${reviewId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const reviewData = reviewResponse.data;

        // Fetch movie details from TMDB using movieId from review data
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${reviewData.movieId}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=es-ES&append_to_response=credits`
        );
        const movieData = movieResponse.data;

        setReview(reviewData);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviewAndMovie();
  }, [reviewId]); // Ensure reviewId is included in the dependency array

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="review-details-page">
      <h1>{movie.title || "Movie Title"}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <p>
        <strong>Review:</strong> {review.text}
      </p>
      <p>
        <strong>Rating:</strong> {review.rating}
      </p>
      <h2>Actors</h2>
      <ul>
        {movie.credits?.cast?.length > 0 ? (
          movie.credits.cast.map((actor) => (
            <li key={actor.id}>{actor.name}</li>
          ))
        ) : (
          <li>No cast information available</li>
        )}
      </ul>
      <h2>Comments</h2>
      {console.log(movie)}
    </div>
  );
}

export default ReviewDetails;
