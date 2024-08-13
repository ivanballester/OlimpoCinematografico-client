import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../service/service.config";
import tmdbservice from "../service/serviceTMDB";

function ReviewsPage() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch reviews from the backend

        const reviewsResponse = await service.get(`/reviews`);
        const reviewsData = reviewsResponse.data;
        console.log(reviewsData);

        // Extract movieIds and reviewIds
        const movieDetailsArray = await Promise.all(
          reviewsData.map(async (review) => {
            const movieResponse = await tmdbservice.get(
              `/movie/${review.movieId}`,
              {
                params: { language: "es-ES" },
              }
            );

            const movieData = movieResponse.data;
            return {
              reviewId: review._id, // Store the reviewId for linking
              movieId: movieData.id,
              title: movieData.title,
              posterPath: movieData.poster_path,
            };
          })
        );

        setMovieDetails(movieDetailsArray);
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  console.log(movieDetails);

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
