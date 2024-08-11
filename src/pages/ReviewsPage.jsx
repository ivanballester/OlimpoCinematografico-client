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

        // Extract movieIds directly
        const movieIds = reviewsData.map((review) => review.movieId);
        console.log(movieIds);
        // Fetch movie details from TMDB for each movieId
        const movieRequests = movieIds.map((id) =>
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${
              import.meta.env.VITE_API_KEY
            }&language=es-ES`
          )
        );
        console.log(movieRequests);
        // Wait for all movie details to be fetched
        const movieResponses = await Promise.all(movieRequests);
        console.log(movieResponses);
        // Process movie details into an array
        const movieDetailsArray = movieResponses.map((response) => ({
          id: response.data.id,
          title: response.data.title,
          posterPath: response.data.poster_path,
        }));
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
            <div key={movie.id} className="movie-card">
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <Link to={`/reviews/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                    alt={movie.title}
                    className="movie-poster"
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
