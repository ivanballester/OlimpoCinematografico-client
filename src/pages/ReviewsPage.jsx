import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ReviewsPage() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch reviews from the backend
        const token = localStorage.getItem("authToken");
        const reviewsResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/reviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const reviewsData = reviewsResponse.data;
        console.log(reviewsData);

        // Extract movieIds and reviewIds
        const movieDetailsArray = await Promise.all(
          reviewsData.map(async (review) => {
            const movieResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${review.movieId}?api_key=${
                import.meta.env.VITE_API_KEY
              }&language=es-ES`
            );
            console.log(movieResponse);
            console.log(review);
            const movieData = movieResponse.data;
            return {
              reviewId: review._id, // Store the reviewId for linking
              movieId: movieData.id,
              title: movieData.title,
              posterPath: movieData.poster_path,
            };
          })
        );

        console.log(movieDetailsArray);
        setMovieDetails(movieDetailsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="reviews-page">
      <h1>PELICULAS</h1>
      <div className="movies-container">
        {movieDetails.length > 0 ? (
          movieDetails.map((movie) => (
            <div key={movie.movieId} className="movie-card">
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <Link to={`/reviews/${movie.reviewId}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                    alt={movie.title}
                    className="movie-poster"
                    style={{ cursor: "pointer" }}
                  />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No hay peliculas aun...</div>
        )}
      </div>
    </div>
  );
}

export default ReviewsPage;
