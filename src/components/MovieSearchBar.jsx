import React, { useState, useEffect } from "react";
import { searchMovies } from "../api/SearchMoviesApi";
import { debounce } from "lodash"; // Import debounce function from lodash
import { Link } from "react-router-dom";
import service from "../service/service.config";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posterUrl, setPosterUrl] = useState("");
  const [showList, setShowList] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Debounce the searchMovies function
  const debouncedSearch = debounce(async (query) => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const results = await searchMovies(query);
      console.log("Movies Results:", results);
      setMovies(Array.isArray(results) ? results : []); // Ensure results is an array
    } catch (error) {
      console.error("Error in debouncedSearch:", error);
      setError("An error occurred while fetching movies.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, 1000);

  const handleChange = (event) => {
    setQuery(event.target.value);
    setShowList(true); // Show list when typing
    debouncedSearch(event.target.value); // Call debounced search
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setQuery(movie.title); // Autocomplete the search bar
    setPosterUrl(`https://image.tmdb.org/t/p/w200${movie.poster_path}`);
    setShowList(false);
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!selectedMovie) {
      setError("Please select a movie.");
      return;
    }

    try {
      await service.post(`/reviews`, {
        movieId: selectedMovie.id,
        rating,
        text,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("An error occurred while submitting the review.");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Buscar peliculas..."
        style={{ backgroundColor: "rgb(249, 207, 120)", color: "black" }}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {showList && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <li
                key={movie.id}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedMovie?.id === movie.id ? "#ddd" : "transparent",
                  padding: "8px 15px",
                  borderBottom: "1px solid #ccc",
                }}
                onClick={() => handleSelectMovie(movie)}
              >
                {movie.title} ({movie.release_date.substring(0, 4)})
              </li>
            ))
          ) : (
            <li>No hay peliculas</li>
          )}
        </ul>
      )}
      {posterUrl && (
        <div className="movie-poster">
          <img
            src={posterUrl}
            alt="Selected Movie Poster"
            height={300}
            width={200}
          />
        </div>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="review-form">
          <div className="rating">
            <label htmlFor="rating">Puntuación</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="1"
              max="5"
              required
              style={{ backgroundColor: "rgb(85, 144, 149)" }}
            />
          </div>
          <div className="review">
            <label htmlFor="review">Crítica</label>
            <textarea
              id="review"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              style={{ backgroundColor: "rgb(249, 207, 120)", color: "black" }}
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: "rgb(165, 137, 103)" }}
          >
            Subir crítica
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* Display error if any */}
        </form>
      )}
      {selectedMovie && (
        <Link
          to={`/reviews/${selectedMovie.id}`}
          state={{
            title: selectedMovie.title,
            posterPath: selectedMovie.poster_path,
          }}
        >
          <button style={{ backgroundColor: "rgb(165, 137, 103)" }}>
            Ver detalles
          </button>
        </Link>
      )}
    </div>
  );
}

export default SearchBar;
