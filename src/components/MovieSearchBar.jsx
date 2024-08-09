import React from "react";
import { useState } from "react";
import { searchMovies } from "../../api/SearchMoviesApi";

function MovieSearchBar() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const result = searchMovies(query);
      setMovies(result);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          placeholder="Buscar pelicula"
          className="form-control"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.release_date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearchBar;
