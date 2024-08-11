import React, { useState, useEffect } from "react";
import { searchMovies } from "../api/SearchMoviesApi"; // Ensure the path is correct
import { debounce } from "lodash"; // Import debounce function from lodash
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

function SearchBar() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]); // Initialize as an array
  const [selectedMovie, setSelectedMovie] = useState(null); // Track selected movie
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posterUrl, setPosterUrl] = useState(""); // Track selected movie's poster
  const [showList, setShowList] = useState(true); // Control visibility of movie list
  const [showForm, setShowForm] = useState(false); // Control visibility of the form
  const [rating, setRating] = useState(0); // Default rating
  const [text, setText] = useState(""); // Review text

  // Debounce the searchMovies function
  const debouncedSearch = debounce(async (query) => {
    if (!query) return; // Do nothing if the query is empty

    setLoading(true);
    setError(null);

    try {
      const results = await searchMovies(query);
      console.log("Movies Results:", results); // Log results
      setMovies(Array.isArray(results) ? results : []); // Ensure results is an array
    } catch (error) {
      console.error("Error in debouncedSearch:", error); // Log the error
      setError("An error occurred while fetching movies.");
      setMovies([]); // Optionally clear the movies on error
    } finally {
      setLoading(false);
    }
  }, 1000); // Debounce delay of 300ms

  const handleChange = (event) => {
    setQuery(event.target.value);
    setShowList(true); // Show list when typing
    debouncedSearch(event.target.value); // Call debounced search
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie); // Update selected movie
    setQuery(movie.title); // Autocomplete the search bar
    setPosterUrl(`https://image.tmdb.org/t/p/w200${movie.poster_path}`); // Set poster URL
    setShowList(false); // Hide the list after selection
    setShowForm(true); // Show the form after selection
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!selectedMovie) {
      setError("Please select a movie.");
      return;
    }

    try {
      // Make API call to save review
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/reviews`,
        {
          movieId: selectedMovie.id,
          rating,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      setShowForm(false); // Hide form after submission
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
        placeholder="Search for movies..."
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
            <li>No movies found</li>
          )}
        </ul>
      )}
      {posterUrl && (
        <div className="movie-poster">
          <img src={posterUrl} alt="Selected Movie Poster" />
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
            />
          </div>
          <div className="review">
            <label htmlFor="review">Crítica</label>
            <textarea
              id="review"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <button type="submit">Subir critica</button>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
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
          <button>View Details</button>
        </Link>
      )}
    </div>
  );
}

export default SearchBar;
