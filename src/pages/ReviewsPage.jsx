import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../service/service.config";
import tmdbservice from "../service/serviceTMDB";
import Footer from "../components/Footers";
import Pagination from "../components/pagination";

function ReviewsPage() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const moviesPerPage = 10;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const reviewsResponse = await service.get(`/reviews`);
        const reviewsData = reviewsResponse.data;
        console.log(reviewsData);

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
              reviewId: review._id,
              movieId: movieData.id,
              title: movieData.title,
              posterPath: movieData.poster_path,
            };
          })
        );
        console.log(movieDetailsArray);
        setMovieDetails(movieDetailsArray);
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  const filteredMovies = movieDetails.filter((movie) =>
    movie.title.toLowerCase().includes(searchTitle.toLowerCase())
  );
  //Pagination calc
  const indexOfLastUser = currentPage * moviesPerPage;
  const indexOfFirstUser = indexOfLastUser - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
    setCurrentPage(1);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="reviews-page">
        <h1 className="homepage-title">PELÍCULAS</h1>
        <input
          type="text"
          placeholder="Buscar película..."
          value={searchTitle}
          onChange={handleSearchChange}
          style={{ backgroundColor: "rgb(249, 207, 120)", color: "black" }}
        />
        <div className="movies-container">
          {currentMovies.length > 0 ? (
            currentMovies.map((movie) => (
              <div key={movie.movieId} className="movie-card">
                <div className="movie-info">
                  <h2 className="homepage-title2">{movie.title}</h2>
                  <Link to={`/reviews/${movie.reviewId}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
        />
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
}

export default ReviewsPage;
